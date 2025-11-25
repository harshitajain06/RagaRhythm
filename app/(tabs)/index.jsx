import { useColorScheme } from '@/hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    ActivityIndicator, Alert,
    Dimensions,
    Image, Platform,
    ScrollView,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View
} from 'react-native';
import { auth } from '../../config/firebase';

export default function AuthPage() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { width } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';

  const [user, loading, error] = useAuthState(auth);

  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('login');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState({});

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerErrors, setRegisterErrors] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers,
      errors: {
        minLength: !minLength,
        hasUpperCase: !hasUpperCase,
        hasLowerCase: !hasLowerCase,
        hasNumbers: !hasNumbers,
        hasSpecialChar: !hasSpecialChar
      }
    };
  };

  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const validateLoginForm = () => {
    const errors = {};
    
    if (!loginEmail.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(loginEmail)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!loginPassword) {
      errors.password = 'Password is required';
    }
    
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegisterForm = () => {
    const errors = {};
    
    if (!registerName.trim()) {
      errors.name = 'Full name is required';
    } else if (!validateName(registerName)) {
      errors.name = 'Name must be at least 2 characters long';
    }
    
    if (!registerEmail.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(registerEmail)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!registerPassword) {
      errors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(registerPassword);
      if (!passwordValidation.isValid) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
      }
    }
    
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateLoginForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setIsLoading(false);
      // Navigate back to main app after successful login
      navigation.goBack();
      Alert.alert('Success', 'Logged in successfully!');
    } catch (error) {
      setIsLoading(false);
      let errorMessage = 'Login failed. Please try again.';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        default:
          errorMessage = error.message;
      }
      
      Alert.alert('Login Failed', errorMessage);
    }
  };

  const handleRegister = async () => {
    if (!validateRegisterForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      await updateProfile(userCredential.user, {
        displayName: registerName,
      });
      setIsLoading(false);
      // Navigate back to main app after successful registration
      navigation.goBack();
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      setIsLoading(false);
      let errorMessage = 'Registration failed. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        default:
          errorMessage = error.message;
      }
      
      Alert.alert('Registration Failed', errorMessage);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDarkMode && { backgroundColor: '#121212' },
        isWeb && styles.webContainer,
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.contentWrapper, isWeb && styles.webContentWrapper]}>
        <View style={styles.iconContainer}>
          <View style={[styles.iconCircle, isDarkMode && styles.iconCircleDark]}>
            <Image 
              source={require('../../assets/images/icon.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
        <Text style={[styles.title, isDarkMode && { color: '#fff' }]}>
          Welcome to RagaRhythm
        </Text>
        <Text style={[styles.subtitle, isDarkMode && { color: '#ccc' }]}>
          Discover the rhythm of Indian classical music
        </Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setMode('login')}
          style={[styles.tab, mode === 'login' && styles.activeTabBackground]}
        >
          <Text style={[styles.tabText, mode === 'login' && styles.activeTabText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMode('register')}
          style={[styles.tab, mode === 'register' && styles.activeTabBackground]}
        >
          <Text style={[styles.tabText, mode === 'register' && styles.activeTabText]}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* Forms */}
      {mode === 'login' ? (
        <View style={styles.form}>
          <Text style={[styles.label, isDarkMode && { color: '#fff' }]}>Email</Text>
          <TextInput
            placeholder="name@example.com"
            style={[
              styles.input, 
              isDarkMode && styles.inputDark,
              loginErrors.email && styles.inputError
            ]}
            value={loginEmail}
            onChangeText={(text) => {
              setLoginEmail(text);
              if (loginErrors.email) {
                setLoginErrors({...loginErrors, email: ''});
              }
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
          />
          {loginErrors.email && <Text style={styles.errorText}>{loginErrors.email}</Text>}
          
          <Text style={[styles.label, isDarkMode && { color: '#fff' }]}>Password</Text>
          <TextInput
            placeholder="••••••••"
            secureTextEntry
            style={[
              styles.input, 
              isDarkMode && styles.inputDark,
              loginErrors.password && styles.inputError
            ]}
            value={loginPassword}
            onChangeText={(text) => {
              setLoginPassword(text);
              if (loginErrors.password) {
                setLoginErrors({...loginErrors, password: ''});
              }
            }}
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
          />
          {loginErrors.password && <Text style={styles.errorText}>{loginErrors.password}</Text>}
          
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogin} style={[styles.button, isDarkMode && styles.buttonDark]} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign in</Text>}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.form}>
          <Text style={[styles.label, isDarkMode && { color: '#fff' }]}>Full Name</Text>
          <TextInput
            placeholder="John Doe"
            style={[
              styles.input, 
              isDarkMode && styles.inputDark,
              registerErrors.name && styles.inputError
            ]}
            value={registerName}
            onChangeText={(text) => {
              setRegisterName(text);
              if (registerErrors.name) {
                setRegisterErrors({...registerErrors, name: ''});
              }
            }}
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
          />
          {registerErrors.name && <Text style={styles.errorText}>{registerErrors.name}</Text>}
          
          <Text style={[styles.label, isDarkMode && { color: '#fff' }]}>Email</Text>
          <TextInput
            placeholder="name@example.com"
            style={[
              styles.input, 
              isDarkMode && styles.inputDark,
              registerErrors.email && styles.inputError
            ]}
            value={registerEmail}
            onChangeText={(text) => {
              setRegisterEmail(text);
              if (registerErrors.email) {
                setRegisterErrors({...registerErrors, email: ''});
              }
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
          />
          {registerErrors.email && <Text style={styles.errorText}>{registerErrors.email}</Text>}
          
          <Text style={[styles.label, isDarkMode && { color: '#fff' }]}>Password</Text>
          <TextInput
            placeholder="••••••••"
            secureTextEntry
            style={[
              styles.input, 
              isDarkMode && styles.inputDark,
              registerErrors.password && styles.inputError
            ]}
            value={registerPassword}
            onChangeText={(text) => {
              setRegisterPassword(text);
              if (registerErrors.password) {
                setRegisterErrors({...registerErrors, password: ''});
              }
            }}
            placeholderTextColor={isDarkMode ? '#666' : '#999'}
          />
          {registerErrors.password && <Text style={styles.errorText}>{registerErrors.password}</Text>}
          
          {/* Password strength indicator for registration */}
          {registerPassword && mode === 'register' && (
            <View style={styles.passwordStrength}>
              <Text style={[styles.strengthLabel, isDarkMode && { color: '#ccc' }]}>Password strength:</Text>
              <View style={styles.strengthBar}>
                <View style={[
                  styles.strengthFill, 
                  { 
                    width: `${Math.min(100, (registerPassword.length / 8) * 100)}%`,
                    backgroundColor: registerPassword.length >= 8 ? '#4CAF50' : '#FFC107'
                  }
                ]} />
              </View>
            </View>
          )}
          
          <TouchableOpacity onPress={handleRegister} style={[styles.button, isDarkMode && styles.buttonDark]} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create account</Text>}
          </TouchableOpacity>
        </View>
      )}

        <TouchableOpacity>
          <Text style={[styles.privacyPolicy, isDarkMode && { color: '#888' }]}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  webContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  contentWrapper: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  webContentWrapper: {
    maxWidth: 400,
    width: '100%',
    maxHeight: '85vh',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    overflow: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    // Hide scrollbar for webkit browsers
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircle: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 999,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconCircleDark: {
    backgroundColor: '#2a2a2a',
    shadowColor: '#764ba2',
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    fontStyle: 'italic',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabBackground: {
    backgroundColor: '#667eea',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  tabText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    color: '#212529',
    fontSize: 13,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 6,
    borderWidth: 2,
    borderColor: '#e9ecef',
    fontSize: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
    color: '#fff',
  },
  inputError: {
    borderColor: '#dc3545',
    borderWidth: 2,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    marginBottom: 12,
    marginTop: -4,
  },
  passwordStrength: {
    marginBottom: 16,
  },
  strengthLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  strengthBar: {
    height: 4,
    backgroundColor: '#e9ecef',
    borderRadius: 2,
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
    transition: 'width 0.3s ease',
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#667eea',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDark: {
    backgroundColor: '#764ba2',
    shadowColor: '#764ba2',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  privacyPolicy: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 11,
    color: '#667eea',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
