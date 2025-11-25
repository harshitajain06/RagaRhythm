import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isLargeScreen = width > 768;
const isExtraLargeScreen = width > 1024;

export default function LandingPage() {
  const navigation = useNavigation();

  useEffect(() => {
    if (isWeb && typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        html, body {
          overflow: auto !important;
          scrollbar-gutter: stable;
        }
        ::-webkit-scrollbar {
          width: 12px;
          display: block !important;
        }
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
          display: block !important;
        }
        ::-webkit-scrollbar-thumb {
          background: #667eea;
          border-radius: 6px;
          display: block !important;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #764ba2;
        }
        * {
          scrollbar-width: thin !important;
          scrollbar-color: #667eea #1a1a1a !important;
        }
        body::-webkit-scrollbar {
          width: 12px;
        }
        body::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        body::-webkit-scrollbar-thumb {
          background: #667eea;
          border-radius: 6px;
        }
      `;
      document.head.appendChild(style);
      
      // Force scrollbar to be always visible
      document.body.style.overflowY = 'scroll';
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('Drawer');
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true}
      persistentScrollbar={true}
      indicatorStyle="white"
      scrollIndicatorInsets={{ right: 1 }}
    >
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={handleGetStarted}
          activeOpacity={0.7}
        >
          <Text style={styles.skipButtonText}>Skip to App →</Text>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.heroTitle}>RagaRhythm</Text>
        <Text style={styles.heroTagline}>
          Discover the Perfect Raga for Every Moment
        </Text>
        <Text style={styles.heroDescription}>
          AI-powered mood-based music recommendations blending Indian classical ragas with global rhythms
        </Text>
        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaButtonText}>Get Started →</Text>
        </TouchableOpacity>
      </View>

      {/* Problem & Solution Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.emojiIcon}>💭</Text>
          <Text style={styles.sectionTitle}>The Problem</Text>
        </View>
        <View style={styles.problemCard}>
          <Text style={styles.problemText}>
            • Can't find music that matches your current mood?
          </Text>
          <Text style={styles.problemText}>
            • Overwhelmed by endless playlists and don't know where to start?
          </Text>
          <Text style={styles.problemText}>
            • Want to explore Indian classical ragas but don't know which one fits the moment?
          </Text>
          <Text style={styles.problemText}>
            • Missing the therapeutic power of traditional music in the digital age?
          </Text>
        </View>

        <View style={[styles.sectionHeader, styles.solutionHeader]}>
          <Text style={styles.emojiIcon}>✨</Text>
          <Text style={styles.sectionTitle}>Our Solution</Text>
        </View>
        <View style={styles.solutionCard}>
          <Text style={styles.solutionText}>
            RagaRhythm uses AI to understand your feelings and recommend the perfect ragas and songs that resonate with your emotional state. Whether you need calming morning ragas, energetic evening melodies, or mood-lifting global beats, we've got you covered.
          </Text>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitleCenter}>What Makes Us Unique</Text>
        
        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🧠</Text>
            <Text style={styles.featureTitle}>AI Mood Detection</Text>
            <Text style={styles.featureDescription}>
              Tell us how you feel, and our AI suggests the perfect ragas and songs to match your emotional state
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🎵</Text>
            <Text style={styles.featureTitle}>Classical Raga Library</Text>
            <Text style={styles.featureDescription}>
              Explore Hindustani & Carnatic ragas organized by time of day, season, and mood
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🌍</Text>
            <Text style={styles.featureTitle}>Global Music Discovery</Text>
            <Text style={styles.featureDescription}>
              Access 150+ curated categories from Bollywood to K-Pop, Sufi to Latin, all in one place
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📅</Text>
            <Text style={styles.featureTitle}>Daily Surprises</Text>
            <Text style={styles.featureDescription}>
              A new featured music category every day to expand your musical horizons
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🌅</Text>
            <Text style={styles.featureTitle}>Time-based Ragas</Text>
            <Text style={styles.featureDescription}>
              Morning, evening, night & seasonal ragas following traditional Indian classical principles
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🎯</Text>
            <Text style={styles.featureTitle}>Personalized Experience</Text>
            <Text style={styles.featureDescription}>
              Your music history and preferences shape future recommendations
            </Text>
          </View>
        </View>
      </View>

      {/* Who It's For Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitleCenter}>Who Is This For?</Text>
        
        <View style={styles.audienceGrid}>
          <View style={styles.audienceCard}>
            <Text style={styles.audienceIcon}>🎼</Text>
            <Text style={styles.audienceTitle}>Classical Music Enthusiasts</Text>
            <Text style={styles.audienceDescription}>
              Deep dive into the world of ragas with proper context and guidance
            </Text>
          </View>

          <View style={styles.audienceCard}>
            <Text style={styles.audienceIcon}>🧘</Text>
            <Text style={styles.audienceTitle}>Mindfulness Seekers</Text>
            <Text style={styles.audienceDescription}>
              Find therapeutic music that aligns with your meditation and wellness practices
            </Text>
          </View>

          <View style={styles.audienceCard}>
            <Text style={styles.audienceIcon}>🌟</Text>
            <Text style={styles.audienceTitle}>Mood-Based Listeners</Text>
            <Text style={styles.audienceDescription}>
              Let your emotions guide your music choices with AI-powered recommendations
            </Text>
          </View>

          <View style={styles.audienceCard}>
            <Text style={styles.audienceIcon}>🎧</Text>
            <Text style={styles.audienceTitle}>Global Music Explorers</Text>
            <Text style={styles.audienceDescription}>
              Discover authentic music from India and around the world in one unified experience
            </Text>
          </View>

          <View style={styles.audienceCard}>
            <Text style={styles.audienceIcon}>📚</Text>
            <Text style={styles.audienceTitle}>Music Students</Text>
            <Text style={styles.audienceDescription}>
              Learn about ragas and their traditional contexts in an accessible format
            </Text>
          </View>

          <View style={styles.audienceCard}>
            <Text style={styles.audienceIcon}>🌏</Text>
            <Text style={styles.audienceTitle}>Cultural Connectors</Text>
            <Text style={styles.audienceDescription}>
              Stay connected to your roots or explore new cultural musical traditions
            </Text>
          </View>
        </View>
      </View>

      {/* How It Works Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitleCenter}>How It Works</Text>
        
        <View style={styles.stepsContainer}>
          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepTitle}>Express Your Mood</Text>
            <Text style={styles.stepDescription}>
              Simply describe how you're feeling - happy, contemplative, energetic, or anything in between
            </Text>
          </View>

          <View style={styles.stepArrow}>
            <Text style={styles.stepArrowText}>↓</Text>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepTitle}>AI Analysis</Text>
            <Text style={styles.stepDescription}>
              Our AI understands your emotional state and matches it with appropriate ragas and music styles
            </Text>
          </View>

          <View style={styles.stepArrow}>
            <Text style={styles.stepArrowText}>↓</Text>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepTitle}>Discover & Listen</Text>
            <Text style={styles.stepDescription}>
              Get personalized raga and song recommendations, then listen instantly via YouTube integration
            </Text>
          </View>

          <View style={styles.stepArrow}>
            <Text style={styles.stepArrowText}>↓</Text>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepTitle}>Explore More</Text>
            <Text style={styles.stepDescription}>
              Browse 150+ global music categories or dive deeper into time-based ragas and regional music
            </Text>
          </View>
        </View>
      </View>

      {/* Unique Value Propositions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitleCenter}>Why Choose RagaRhythm?</Text>
        
        <View style={styles.valuePropsContainer}>
          <View style={styles.valuePropCard}>
            <Text style={styles.valuePropIcon}>🎯</Text>
            <Text style={styles.valuePropTitle}>Scientifically Grounded</Text>
            <Text style={styles.valuePropText}>
              Based on centuries of Indian classical music theory - ragas for specific times, seasons, and emotional states
            </Text>
          </View>

          <View style={styles.valuePropCard}>
            <Text style={styles.valuePropIcon}>🤖</Text>
            <Text style={styles.valuePropTitle}>Modern AI Technology</Text>
            <Text style={styles.valuePropText}>
              Powered by GPT-4 for intelligent mood analysis and music matching
            </Text>
          </View>

          <View style={styles.valuePropCard}>
            <Text style={styles.valuePropIcon}>🎭</Text>
            <Text style={styles.valuePropTitle}>Emotional Intelligence</Text>
            <Text style={styles.valuePropText}>
              We understand that music is therapy - find songs that truly resonate with your inner state
            </Text>
          </View>

          <View style={styles.valuePropCard}>
            <Text style={styles.valuePropIcon}>🌐</Text>
            <Text style={styles.valuePropTitle}>Best of Both Worlds</Text>
            <Text style={styles.valuePropText}>
              Traditional Indian classical wisdom meets global contemporary music in one seamless experience
            </Text>
          </View>

          <View style={styles.valuePropCard}>
            <Text style={styles.valuePropIcon}>🆓</Text>
            <Text style={styles.valuePropTitle}>Free & Accessible</Text>
            <Text style={styles.valuePropText}>
              No subscriptions, no paywalls - just pure music discovery powered by YouTube
            </Text>
          </View>

          <View style={styles.valuePropCard}>
            <Text style={styles.valuePropIcon}>📱</Text>
            <Text style={styles.valuePropTitle}>Cross-Platform</Text>
            <Text style={styles.valuePropText}>
              Use on mobile, tablet, or web - your music journey follows you everywhere
            </Text>
          </View>
        </View>
      </View>

      {/* Call to Action Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Find Your Perfect Rhythm?</Text>
        <Text style={styles.ctaDescription}>
          Join music lovers discovering the therapeutic power of ragas and mood-based music
        </Text>
        <TouchableOpacity 
          style={styles.ctaButtonLarge}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaButtonLargeText}>Start Your Musical Journey</Text>
        </TouchableOpacity>
        <Text style={styles.ctaSubtext}>No credit card required • Sign up in 30 seconds</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 RagaRhythm. All rights reserved.</Text>
        <Text style={styles.footerSubtext}>
          Bringing the ancient wisdom of ragas to the modern world
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  contentContainer: {
    paddingBottom: 10,
    ...(isWeb && {
      maxWidth: isExtraLargeScreen ? 1400 : isLargeScreen ? 1200 : '100%',
      marginHorizontal: 'auto',
      width: '100%',
    }),
  },
  
  // Hero Section
  heroSection: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    position: 'relative',
  },
  skipButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    zIndex: 10,
  },
  skipButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  logoContainer: {
    marginBottom: 8,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logo: {
    width: 60,
    height: 60,
  },
  heroTitle: {
    fontSize: isExtraLargeScreen ? 38 : isLargeScreen ? 34 : 28,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  heroTagline: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
    opacity: 0.95,
  },
  heroDescription: {
    fontSize: 12,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 18,
    maxWidth: 500,
    paddingHorizontal: 15,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  ctaButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#667eea',
  },

  // Section Styles
  section: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  solutionHeader: {
    marginTop: 12,
  },
  emojiIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  sectionTitleCenter: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 14,
  },

  // Problem & Solution
  problemCard: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B6B',
  },
  problemText: {
    fontSize: 12,
    color: '#e0e0e0',
    marginBottom: 6,
    lineHeight: 18,
  },
  solutionCard: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  solutionText: {
    fontSize: 12,
    color: '#e0e0e0',
    lineHeight: 19,
  },

  // Features Grid
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  featureCard: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 10,
    width: isExtraLargeScreen ? '31%' : isLargeScreen ? '48%' : '100%',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: '#aaa',
    lineHeight: 17,
  },

  // Audience Grid
  audienceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  audienceCard: {
    backgroundColor: '#667eea',
    padding: 12,
    borderRadius: 10,
    width: isExtraLargeScreen ? '31%' : isLargeScreen ? '48%' : '100%',
    alignItems: 'center',
  },
  audienceIcon: {
    fontSize: 30,
    marginBottom: 6,
  },
  audienceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  audienceDescription: {
    fontSize: 11,
    color: '#e0e0e0',
    lineHeight: 16,
    textAlign: 'center',
  },

  // Steps
  stepsContainer: {
    alignItems: 'center',
  },
  stepCard: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#667eea',
  },
  stepNumber: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 12,
    color: '#aaa',
    lineHeight: 17,
    textAlign: 'center',
  },
  stepArrow: {
    marginVertical: 6,
  },
  stepArrowText: {
    fontSize: 20,
    color: '#667eea',
  },

  // Value Props
  valuePropsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  valuePropCard: {
    backgroundColor: '#1a1a1a',
    padding: 10,
    borderRadius: 10,
    width: isExtraLargeScreen ? '31%' : isLargeScreen ? '48%' : '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#764ba2',
  },
  valuePropIcon: {
    fontSize: 26,
    marginBottom: 6,
  },
  valuePropTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  valuePropText: {
    fontSize: 11,
    color: '#aaa',
    lineHeight: 16,
    textAlign: 'center',
  },

  // CTA Section
  ctaSection: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#1a1a1a',
    marginHorizontal: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 15,
    textAlign: 'center',
    maxWidth: 500,
  },
  ctaButtonLarge: {
    backgroundColor: '#667eea',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 25,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaButtonLargeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  ctaSubtext: {
    fontSize: 10,
    color: '#888',
    marginTop: 10,
    textAlign: 'center',
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  footerText: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 10,
    color: '#555',
    fontStyle: 'italic',
  },
});

