import { supabase } from '@/integrations/supabase/client';

export interface AuthResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface ResetPasswordResponse extends AuthResponse {
  sessionId?: string;
}

/**
 * Request a password reset email for the given email address
 */
export const requestPasswordReset = async (email: string): Promise<AuthResponse> => {
  try {
    const redirectUrl = `${window.location.origin}/reset-password`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      return {
        success: false,
        message: 'Failed to send reset email',
        error: error.message,
      };
    }

    return {
      success: true,
      message: 'Password reset email sent. Please check your email inbox.',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return {
      success: false,
      message: 'Failed to request password reset',
      error: errorMessage,
    };
  }
};

/**
 * Update the user's password with a new password
 * This is used after the user has received the reset link
 */
export const updatePassword = async (newPassword: string): Promise<AuthResponse> => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return {
        success: false,
        message: 'Failed to update password',
        error: error.message,
      };
    }

    return {
      success: true,
      message: 'Password updated successfully. Please log in with your new password.',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return {
      success: false,
      message: 'Failed to update password',
      error: errorMessage,
    };
  }
};

/**
 * Verify that the user is authenticated and can reset their password
 */
export const verifyPasswordResetSession = async (): Promise<boolean> => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    return !error && !!session;
  } catch (error) {
    return false;
  }
};

/**
 * Change password for authenticated users
 */
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<AuthResponse> => {
  try {
    // First verify current password by attempting to re-authenticate
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session?.user?.email) {
      return {
        success: false,
        message: 'No active session found',
        error: 'Please log in again to change your password',
      };
    }

    // Attempt to sign in with current credentials to verify password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: session.user.email,
      password: currentPassword,
    });

    if (signInError) {
      return {
        success: false,
        message: 'Current password is incorrect',
        error: signInError.message,
      };
    }

    // Update to new password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      return {
        success: false,
        message: 'Failed to update password',
        error: updateError.message,
      };
    }

    return {
      success: true,
      message: 'Password changed successfully',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return {
      success: false,
      message: 'Failed to change password',
      error: errorMessage,
    };
  }
};

/**
 * Sign out the user
 */
export const signOut = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.signOut();
    return !error;
  } catch (error) {
    return false;
  }
};
