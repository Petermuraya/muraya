# Password Reset & Account Management Guide

## Overview
This document outlines the password reset and account management features implemented for your portfolio admin dashboard.

## Features Implemented

### 1. **Forgot Password Flow**
Users can request a password reset by providing their email address. A secure reset link is sent to their email.

**Flow:**
1. User clicks "Forgot?" on the login page
2. Enters their email address
3. Receives a password reset email with a link
4. Clicks the link and sets a new password
5. Can log in with the new password

**Components:**
- `ForgotPassword.tsx` - Handles the forgot password request form
- `PasswordResetConfirm.tsx` - Handles password reset confirmation

**Service:**
- `authService.ts` - Contains `requestPasswordReset()` function

### 2. **Password Reset Route**
A dedicated route `/reset-password` handles password reset after the user clicks the email link.

**Route:**
```
/reset-password - Password reset confirmation page
```

**Key Features:**
- Verifies the reset session is valid
- Prevents expired links
- Shows appropriate error messages
- Auto-redirects to login after successful reset

### 3. **Change Password (Authenticated Users)**
Logged-in users can change their password from the admin dashboard.

**Component:**
- `ChangePasswordForm.tsx` - Allows authenticated users to change their password

**Features:**
- Requires current password verification
- Validates new password strength
- Shows/hide password toggle
- Clear error messages

### 4. **Updated Admin Login**
The admin login screen now includes a "Forgot?" link for easy access to password reset.

**Components:**
- `AdminLogin.tsx` - Updated with forgot password button
- `AdminAuth.tsx` - Enhanced to handle three auth modes: login, signup, and forgot-password

## Service Functions

### `authService.ts` Functions

#### `requestPasswordReset(email: string): Promise<AuthResponse>`
Sends a password reset email to the specified address.

```typescript
const response = await requestPasswordReset('user@example.com');
if (response.success) {
  // Email sent successfully
} else {
  // Handle error
  console.error(response.error);
}
```

#### `updatePassword(newPassword: string): Promise<AuthResponse>`
Updates the user's password using a reset token (after clicking reset link).

```typescript
const response = await updatePassword('newSecurePassword123');
if (response.success) {
  // Password updated, redirect to login
} else {
  // Handle error
}
```

#### `changePassword(currentPassword: string, newPassword: string): Promise<AuthResponse>`
Changes password for authenticated users (requires current password verification).

```typescript
const response = await changePassword('currentPassword123', 'newPassword456');
if (response.success) {
  // Password changed successfully
} else {
  // Handle error - likely current password is incorrect
}
```

#### `verifyPasswordResetSession(): Promise<boolean>`
Verifies that the user has a valid password reset session.

```typescript
const isValid = await verifyPasswordResetSession();
if (!isValid) {
  // Redirect to login or show error
}
```

#### `signOut(): Promise<boolean>`
Signs out the current user.

```typescript
const success = await signOut();
if (success) {
  // User logged out
}
```

## Integration Steps

### 1. **Supabase Configuration**
Ensure your Supabase project is configured for email-based password resets:

1. Go to Supabase Dashboard → Authentication → Email Templates
2. Customize the password reset email template if needed
3. The default template will include the reset link with the callback URL: `https://yourdomain.com/reset-password`

### 2. **Environment Variables**
Your `.env` file should already contain:
```
VITE_SUPABASE_URL="your_project_url"
VITE_SUPABASE_PUBLISHABLE_KEY="your_public_key"
```

### 3. **Adding to Admin Dashboard**
To add the "Change Password" form to your admin dashboard:

```tsx
import ChangePasswordForm from '@/components/ChangePasswordForm';

// In your AdminDashboard component:
<ChangePasswordForm />
```

## User Experience Flow

### Forgot Password Flow
```
Login Page
    ↓
Click "Forgot?" button
    ↓
Enter email address
    ↓
Receive reset email
    ↓
Click link in email
    ↓
Set new password
    ↓
Password confirmation page
    ↓
Redirect to login (3 seconds)
    ↓
Login with new password
```

### Change Password Flow
```
Admin Dashboard
    ↓
Navigate to Account Settings
    ↓
Click "Change Password"
    ↓
Enter current password + new password
    ↓
Verify and update
    ↓
Success message
```

## Security Considerations

1. **Reset Token Expiry**: Supabase reset links expire after 24 hours
2. **HTTPS Only**: Password reset works over HTTPS to prevent token exposure
3. **No Password Logging**: Passwords are never logged or stored in plain text
4. **Current Password Verification**: Changing password requires current password
5. **Session Validation**: Reset links are tied to user sessions

## Email Configuration

### Reset Email Template
The password reset email sent by Supabase includes:
- User's email address
- Reset link with unique token
- Link expiry time (24 hours)
- Security notice

### Customization
To customize the email template:
1. Go to Supabase Dashboard
2. Navigate to Authentication → Email Templates
3. Edit the "Reset Password" template
4. Use available variables like `{{ .ConfirmationURL }}`

## Testing

### Test Forgot Password:
1. Go to admin login
2. Click "Forgot?" 
3. Enter your email
4. Check email for reset link
5. Click link and set new password
6. Log in with new password

### Test Change Password:
1. Log in to admin dashboard
2. Go to account settings
3. Enter current password + new password
4. Verify password change works

## Error Handling

The system handles various errors gracefully:

- **Invalid email**: Shows "Invalid email format"
- **Non-existent account**: Shows "Account not found"
- **Expired reset link**: Shows "Link has expired"
- **Password mismatch**: Shows "Passwords don't match"
- **Weak password**: Shows "Password must be at least 8 characters"
- **Current password incorrect**: Shows "Current password is incorrect"

## API Responses

### AuthResponse Interface
```typescript
interface AuthResponse {
  success: boolean;
  message: string;
  error?: string;
}
```

All auth service functions return this interface with:
- `success`: Boolean indicating success/failure
- `message`: User-friendly message
- `error`: Technical error details (if applicable)

## Component Props

### ForgotPassword
```typescript
interface ForgotPasswordProps {
  onBack: () => void;  // Callback to return to login
}
```

### PasswordResetConfirm
No props required. Automatically verifies and handles the reset session.

### ChangePasswordForm
No props required. Uses the authenticated user from context.

## Next Steps

1. **Test the implementation** by going through the forgot password flow
2. **Customize the email template** in Supabase if desired
3. **Add ChangePasswordForm to dashboard** if you want users to change passwords in-app
4. **Monitor authentication events** in Supabase logs

## Troubleshooting

### Reset email not received:
1. Check spam/junk folder
2. Verify email in Supabase database
3. Check Supabase email configuration

### Link expires too quickly:
- Supabase links expire after 24 hours by default
- This is a security feature and cannot be changed

### Password update fails:
1. Verify user is authenticated
2. Check password meets requirements (8+ characters)
3. Check browser console for error details

## Files Modified/Created

**New Files:**
- `src/services/authService.ts` - Auth service functions
- `src/components/ForgotPassword.tsx` - Forgot password form
- `src/components/PasswordResetConfirm.tsx` - Password reset confirmation
- `src/components/ChangePasswordForm.tsx` - Change password form
- `src/pages/PasswordReset.tsx` - Password reset page

**Modified Files:**
- `src/components/AdminLogin.tsx` - Added forgot password link
- `src/components/AdminAuth.tsx` - Enhanced auth mode handling
- `src/App.tsx` - Added /reset-password route

**Features Added:**
✅ Forgot password email request
✅ Password reset confirmation
✅ Change password for authenticated users
✅ Email verification
✅ Session validation
✅ Error handling
✅ User-friendly UI
✅ Responsive design

## Support

For issues or questions about the password reset feature, refer to:
- Supabase Documentation: https://supabase.com/docs/guides/auth/passwords
- React Router Documentation: https://reactrouter.com/
