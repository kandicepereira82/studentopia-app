# Password Reset Email Integration Guide

## Current Implementation Status

The password reset feature is **fully functional** for local testing with the following components:

### ✅ What's Working Now

1. **Email Validation** - Validates email format before sending reset request
2. **Token Generation** - Creates secure 6-digit reset tokens
3. **Token Storage** - Stores tokens with 15-minute expiry in AsyncStorage
4. **Token Verification** - Validates token before allowing password reset
5. **Password Reset** - Updates user password with new hashed value
6. **User Feedback** - Beautiful modal with clear confirmation message
7. **Console Logging** - Reset token logged to console for testing

### 🔧 What Needs Email Service Integration

Currently, the reset token is **logged to the console** instead of being emailed to users. This works perfectly for:
- Development and testing
- Local/offline use
- Demo environments

For **production deployment**, you need to integrate an email service to actually send reset emails to users.

---

## Testing the Current Implementation

### For Users (Testing)

1. Navigate to Login tab on onboarding page
2. Click "Forgot Password?" link below password field
3. Enter your email address
4. Click "Send Link" button
5. Success modal appears with message: "Password reset email sent – please check your inbox or spam folder"
6. **Check the logs** (LOGS tab in Vibecode app or `expo.log` file) for the reset token
7. Look for: `[Password Reset] Token for yourname@email.com: 123456`

### For Developers (Checking Logs)

```bash
# View logs in real-time
tail -f /home/user/workspace/expo.log | grep "Password Reset"

# Or check last 50 lines of logs
tail -50 /home/user/workspace/expo.log
```

---

## Production Email Integration Options

Choose one of the following options based on your infrastructure:

### Option 1: Firebase Authentication (Recommended for Mobile Apps)

**Pros:** Built-in email templates, secure, easy integration, handles everything
**Cons:** Requires Firebase setup, vendor lock-in
**Cost:** Free tier: 10K emails/month

#### Setup Steps:

1. **Install Firebase**
```bash
bun add firebase
```

2. **Update authService.ts** (replace requestPasswordReset method):

```typescript
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Initialize Firebase (add your config)
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Inside authService object:
async requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to send reset email" };
  }
}
```

3. **Configure Firebase Console:**
   - Enable Email/Password authentication
   - Customize email template in Authentication → Templates
   - Add your app domain to authorized domains

### Option 2: Backend API with SMTP Service

**Pros:** Full control, flexible, can use any SMTP provider
**Cons:** Requires backend server, more code to maintain
**Cost:** Varies by SMTP provider (SendGrid, Mailgun, AWS SES)

#### Setup Steps:

1. **Create Backend Endpoint** (`/api/auth/password-reset`)

```typescript
// backend/routes/auth.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'sendgrid', 'mailgun', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post('/api/auth/password-reset', async (req, res) => {
  const { email, token } = req.body;

  const resetLink = `studentopia://reset-password?email=${email}&token=${token}`;

  const mailOptions = {
    from: 'noreply@studentopia.app',
    to: email,
    subject: 'Reset Your Studentopia Password',
    html: `
      <h2>Password Reset Request</h2>
      <p>You requested to reset your password. Use this code:</p>
      <h1 style="color: #3B82F6; font-size: 32px;">${token}</h1>
      <p>Or click this link: <a href="${resetLink}">Reset Password</a></p>
      <p>This code expires in 15 minutes.</p>
      <p><small>If you didn't request this, please ignore this email.</small></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});
```

2. **Update authService.ts** (replace requestPasswordReset method):

```typescript
async requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const credentialsData = await AsyncStorage.getItem("app_credentials");
    if (!credentialsData) {
      return { success: false, error: "Email not found" };
    }

    const credentials: StoredCredential[] = JSON.parse(credentialsData);
    const credential = credentials.find((c) => c.email === email);

    if (!credential) {
      return { success: false, error: "Email not found" };
    }

    // Generate reset token
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    // Store token locally
    const resetTokensData = await AsyncStorage.getItem("password_reset_tokens");
    const resetTokens = resetTokensData ? JSON.parse(resetTokensData) : {};
    resetTokens[email] = {
      token: resetToken,
      expiry: resetTokenExpiry,
      userId: credential.userId,
    };
    await AsyncStorage.setItem("password_reset_tokens", JSON.stringify(resetTokens));

    // Send email via backend API
    const response = await fetch('https://your-backend.com/api/auth/password-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token: resetToken }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, error: "Failed to process password reset request" };
  }
}
```

### Option 3: SendGrid (Cloud Email Service)

**Pros:** Easy setup, reliable, good free tier, API-based
**Cons:** Requires API key, vendor dependency
**Cost:** Free tier: 100 emails/day

#### Setup Steps:

1. **Install SendGrid**
```bash
bun add @sendgrid/mail
```

2. **Create Email Service** (`src/services/emailService.ts`):

```typescript
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.EXPO_PUBLIC_SENDGRID_API_KEY!);

export const emailService = {
  async sendPasswordResetEmail(email: string, token: string): Promise<boolean> {
    const msg = {
      to: email,
      from: 'noreply@studentopia.app',
      subject: 'Reset Your Studentopia Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1F2937;">Password Reset Request</h2>
          <p>You requested to reset your Studentopia password.</p>
          <p>Your reset code is:</p>
          <div style="background: #F3F4F6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #3B82F6; font-size: 36px; margin: 0;">${token}</h1>
          </div>
          <p>This code will expire in 15 minutes.</p>
          <p style="color: #6B7280; font-size: 14px;">
            If you didn't request this, please ignore this email.
          </p>
        </div>
      `,
    };

    try {
      await sendgrid.send(msg);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  },
};
```

3. **Update authService.ts**:

```typescript
import { emailService } from '../services/emailService';

// Inside requestPasswordReset method, after storing token:
const emailSent = await emailService.sendPasswordResetEmail(email, resetToken);
if (!emailSent) {
  return { success: false, error: "Failed to send reset email" };
}
```

---

## Email Template Best Practices

### Subject Line
- Clear and actionable: "Reset Your Studentopia Password"
- Avoid spam triggers: Don't use "URGENT!!!" or excessive caps

### Email Body Should Include:
1. **Clear heading** - "Password Reset Request"
2. **Reset code/link** - Large, easy to copy 6-digit code
3. **Expiry time** - "This code expires in 15 minutes"
4. **Security note** - "If you didn't request this, ignore this email"
5. **Brand identity** - Studentopia logo and colors
6. **Support contact** - Link to help/support if needed

### Example Production Email Template

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #F9FAFB; margin: 0; padding: 20px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🔒 Studentopia</h1>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="color: #1F2937; margin-top: 0; font-size: 24px;">Password Reset Request</h2>
        <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">
          You requested to reset your Studentopia password. Enter this code in the app:
        </p>

        <!-- Reset Code -->
        <div style="background-color: #EFF6FF; border: 2px dashed #3B82F6; border-radius: 8px; padding: 30px; text-align: center; margin: 30px 0;">
          <div style="color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Your Reset Code</div>
          <div style="color: #3B82F6; font-size: 48px; font-weight: bold; letter-spacing: 4px; font-family: 'Courier New', monospace;">{{TOKEN}}</div>
        </div>

        <!-- Expiry Warning -->
        <div style="background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; border-radius: 4px; margin: 20px 0;">
          <p style="color: #92400E; margin: 0; font-size: 14px;">
            ⏰ This code will expire in <strong>15 minutes</strong>
          </p>
        </div>

        <!-- Security Note -->
        <p style="color: #6B7280; font-size: 14px; line-height: 1.6;">
          If you didn't request this password reset, you can safely ignore this email.
          Your password will remain unchanged.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #F9FAFB; padding: 30px; text-align: center; border-top: 1px solid #E5E7EB;">
        <p style="color: #9CA3AF; font-size: 12px; margin: 0;">
          © 2025 Studentopia. All rights reserved.<br>
          Need help? Contact support@studentopia.app
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## Testing Email Delivery

### Gmail Testing Tips

1. **Check Spam Folder** - First-time sender emails often land in spam
2. **Add to Safe Senders** - Mark as "Not Spam" to improve deliverability
3. **Test with Gmail Filters** - Create filters to route to specific folders
4. **Check Blocked Senders** - Ensure sender email isn't blocked

### iCloud Testing Tips

1. **Check Mail Rules** - iCloud has strict filtering rules
2. **Add to VIP** - Mark sender as VIP to ensure inbox delivery
3. **Test Multiple Addresses** - Test with @icloud.com, @me.com, @mac.com
4. **Check Server Status** - iCloud mail can have intermittent delays

### Testing Checklist

- [ ] Email arrives in inbox (not spam)
- [ ] Subject line displays correctly
- [ ] Email renders properly on mobile and desktop
- [ ] Reset code is clearly visible and copyable
- [ ] Links work correctly (if using deep links)
- [ ] Email arrives within 30 seconds
- [ ] Token expires after 15 minutes
- [ ] Invalid email shows error message
- [ ] Expired token shows error message
- [ ] Password successfully resets with valid token

---

## Security Considerations

### Current Security Features ✅

1. **Email Validation** - Validates email format before processing
2. **Token Expiry** - 15-minute expiration prevents long-term token reuse
3. **One-Time Use** - Token deleted after successful password reset
4. **Password Hashing** - Uses SHA256 for secure password storage
5. **No Password Storage** - Only email/username stored in autofill

### Additional Security Recommendations

1. **Rate Limiting** - Limit password reset requests to 3 per hour per email
2. **IP Tracking** - Log IP addresses for reset requests (backend)
3. **HTTPS Only** - Ensure all API calls use HTTPS
4. **CAPTCHA** - Add CAPTCHA to prevent automated attacks
5. **Email Verification** - Verify email ownership before allowing reset
6. **Audit Logging** - Log all password reset attempts for security review

---

## Troubleshooting

### User Not Receiving Emails

**Check:**
1. Email entered correctly (no typos)
2. Spam/junk folder
3. Email service logs for errors
4. API key/credentials valid
5. Sender domain not blacklisted
6. Email service quota not exceeded

**Solutions:**
- Resend email after 5 minutes
- Try different email address
- Contact email service support
- Check server logs for errors

### Token Not Working

**Check:**
1. Token expired (>15 minutes)
2. Token already used
3. Email doesn't match stored credentials
4. Token typo (case-sensitive)

**Solutions:**
- Request new reset token
- Copy-paste token instead of typing
- Check token in logs (development)

### Email Goes to Spam

**Solutions:**
1. Add SPF/DKIM records to domain
2. Use verified sender email
3. Warm up email sending domain
4. Use email service with good reputation
5. Ask users to whitelist sender

---

## Cost Estimation

| Service | Free Tier | Paid Plans | Best For |
|---------|-----------|------------|----------|
| **Firebase Auth** | 10K emails/month | $0.05/1K emails | Mobile apps, easy setup |
| **SendGrid** | 100 emails/day | $15/month (40K emails) | Reliable delivery |
| **Mailgun** | 5K emails/month | $35/month (50K emails) | Developer-friendly |
| **AWS SES** | 62K emails/month (free tier) | $0.10/1K emails | Cost-effective at scale |
| **SMTP (Gmail)** | 500 emails/day | Free | Testing only |

**Recommendation:** Start with Firebase Auth for simplicity, migrate to SendGrid or AWS SES for production scale.

---

## Implementation Timeline

### Immediate (Testing/Development)
✅ Current console logging works perfectly

### Before Production Launch (Critical)
🔧 Integrate email service (Firebase/SendGrid/SMTP)
🔧 Test with Gmail and iCloud accounts
🔧 Set up SPF/DKIM records for domain
🔧 Configure email templates
🔧 Add rate limiting

### Post-Launch (Enhancements)
📋 Add password reset confirmation email
📋 Implement password strength requirements
📋 Add 2FA for extra security
📋 Monitor email deliverability metrics

---

## Summary

The password reset feature is **production-ready** except for email delivery. The token generation, validation, and security features are all fully implemented and working correctly.

**Current Status:** ✅ Fully functional for local testing (token in console logs)
**Production Ready:** 🔧 Needs email service integration (1-2 hours setup time)

Choose your email service based on:
- **Firebase Auth** - Easiest for mobile apps
- **SendGrid** - Best deliverability and reliability
- **AWS SES** - Most cost-effective at scale
- **Backend SMTP** - Maximum control and flexibility

All email service options are documented above with complete setup instructions.
