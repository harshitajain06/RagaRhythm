import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TheoryLessonsScreen() {
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const isWeb = Platform.OS === 'web';

  const categories = ['All', 'Fundamentals', 'Ragas', 'Taals', 'Advanced'];

  const lessons = [
    {
      id: 1,
      title: 'Introduction to Swaras (Notes)',
      category: 'Fundamentals',
      level: 'Beginner',
      duration: '10 min',
      icon: '🎵',
      description: 'Learn the seven fundamental notes of Indian classical music',
      content: `
The Seven Swaras (सप्त स्वर):

1. Sa (Shadja) - षड्ज - Tonic note
2. Re (Rishabh) - ऋषभ - Second note
3. Ga (Gandhar) - गान्धार - Third note
4. Ma (Madhyam) - मध्यम - Fourth note
5. Pa (Pancham) - पञ्चम - Fifth note
6. Dha (Dhaivat) - धैवत - Sixth note
7. Ni (Nishad) - निषाद - Seventh note

Key Concepts:
• Shuddha (Natural) vs Komal (Flat) vs Teevra (Sharp)
• Sa and Pa are fixed (achala swaras)
• Re, Ga, Dha, Ni can be komal or shuddha
• Ma can be shuddha or teevra

Western Equivalent:
Sa = Do (C), Re = Re (D), Ga = Mi (E), Ma = Fa (F),
Pa = Sol (G), Dha = La (A), Ni = Ti (B)
      `,
      quiz: {
        question: 'Which swaras are called "achala swaras" (fixed notes)?',
        options: ['Sa and Pa', 'Re and Ga', 'Ma and Dha', 'Ga and Ni'],
        correct: 0,
      }
    },
    {
      id: 2,
      title: 'Understanding Ragas',
      category: 'Ragas',
      level: 'Beginner',
      duration: '15 min',
      icon: '🎼',
      description: 'What is a raga and how is it structured?',
      content: `
What is a Raga?

A raga is a melodic framework for improvisation and composition. It's more than just a scale - it has personality and emotional content.

Essential Elements of a Raga:

1. Thaat (थाट) - Parent scale
   • 10 parent scales in Hindustani music
   • 72 melakarta ragas in Carnatic music

2. Aroha (आरोह) - Ascending scale
   • The way notes ascend

3. Avaroha (अवरोह) - Descending scale
   • The way notes descend

4. Vadi (वादी) - Most important note
   • The note that is emphasized most

5. Samvadi (संवादी) - Second most important
   • Consonant with vadi

6. Pakad (पकड़) - Characteristic phrase
   • Unique identity of the raga

7. Time Theory (समय सिद्धांत)
   • Morning ragas: peacful, devotional
   • Evening ragas: romantic, devotional
   • Night ragas: serious, contemplative

Raga Categories:
• Janya Ragas - Derived from thaats
• Vakra Ragas - Zigzag movements
• Audava - 5 notes
• Shadava - 6 notes
• Sampurna - 7 notes
      `,
      quiz: {
        question: 'What is the "vadi" in a raga?',
        options: [
          'The first note',
          'The most important note',
          'The last note',
          'The highest note'
        ],
        correct: 1,
      }
    },
    {
      id: 3,
      title: 'The 10 Thaats',
      category: 'Ragas',
      level: 'Intermediate',
      duration: '20 min',
      icon: '📚',
      description: 'Master the parent scales of Hindustani classical music',
      content: `
The 10 Thaats (थाट):

Thaat is a method of classifying ragas in North Indian classical music, formulated by Vishnu Narayan Bhatkhande.

1. Bilawal (बिलावल)
   • S R G M P D N S (all natural)
   • Western major scale equivalent

2. Khamaj (खमाज)
   • S R G M P D n S (komal Ni)

3. Kafi (काफ़ी)
   • S R g M P D n S (komal Ga & Ni)

4. Asavari (आसावरी)
   • S R g M P d n S (komal Ga, Dha, Ni)

5. Bhairavi (भैरवी)
   • S r g M P d n S (komal Re, Ga, Dha, Ni)

6. Kalyan (कल्याण)
   • S R G m P D N S (teevra Ma)

7. Marwa (मारवा)
   • S r G m P D N S (komal Re, teevra Ma)

8. Purvi (पूर्वी)
   • S r G m P d N S (komal Re & Dha, teevra Ma)

9. Todi (टोडी)
   • S r g m P d N S (komal Re & Dha, teevra Ma)

10. Bhairav (भैरव)
    • S r G M P d N S (komal Re & Dha)

Each thaat generates many ragas!
Example: Bilawal thaat → Alhaiya Bilawal, Shankara, etc.
      `,
      quiz: {
        question: 'Which thaat has all natural notes?',
        options: ['Khamaj', 'Bilawal', 'Kalyan', 'Kafi'],
        correct: 1,
      }
    },
    {
      id: 4,
      title: 'Introduction to Taal (Rhythm)',
      category: 'Taals',
      level: 'Beginner',
      duration: '12 min',
      icon: '🥁',
      description: 'Understanding rhythmic cycles in Indian classical music',
      content: `
Understanding Taal (ताल):

Taal is the rhythmic cycle that structures time in Indian classical music.

Key Concepts:

1. Matra (मात्रा) - Beat
   • Basic unit of time

2. Vibhag (विभाग) - Division
   • Groups of matras

3. Sam (सम) - First beat
   • Most important beat (marked with X)
   • Compositions resolve on sam

4. Tali (ताली) - Clap
   • Emphasized beats

5. Khali (खाली) - Wave
   • Empty or quiet beat (marked with 0)

Common Taals:

Teental (तीनताल) - 16 beats
• X 2 0 3 (4+4+4+4)
• Most popular taal

Jhaptaal (झपताल) - 10 beats
• X 2 0 3 (2+3+2+3)

Ektaal (एकताल) - 12 beats
• X 0 2 0 3 4 (2+2+2+2+2+2)

Rupak (रूपक) - 7 beats
• X 2 3 (3+2+2)

Dadra (दादरा) - 6 beats
• X 0 (3+3)
• Light classical

Lay (Tempo):
• Vilambit - Slow (20-40 BPM)
• Madhya - Medium (80-160 BPM)
• Drut - Fast (160-320 BPM)
      `,
      quiz: {
        question: 'What is "sam" in taal?',
        options: [
          'The last beat',
          'The first and most important beat',
          'The middle beat',
          'A type of drum'
        ],
        correct: 1,
      }
    },
    {
      id: 5,
      title: 'Alankars (Exercises)',
      category: 'Fundamentals',
      level: 'Beginner',
      duration: '15 min',
      icon: '✏️',
      description: 'Essential vocal and instrumental exercises',
      content: `
Alankars (अलंकार) - Musical Ornaments:

Alankars are systematic exercises to develop:
• Voice control and flexibility
• Note accuracy and clarity
• Speed and agility
• Understanding of raga patterns

Basic Alankars:

1. Sarali Varisai (सरली वरिसै)
   Sa Re Ga Ma Pa Dha Ni Sa
   Sa Ni Dha Pa Ma Ga Re Sa

2. Two-note combinations
   Sa Re, Re Ga, Ga Ma, Ma Pa, Pa Dha, Dha Ni, Ni Sa
   Sa Ni, Ni Dha, Dha Pa, Pa Ma, Ma Ga, Ga Re, Re Sa

3. Three-note combinations
   Sa Re Ga, Re Ga Ma, Ga Ma Pa, Ma Pa Dha
   Sa Ni Dha, Ni Dha Pa, Dha Pa Ma, Pa Ma Ga

4. Four-note combinations
   Sa Re Ga Ma, Re Ga Ma Pa, Ga Ma Pa Dha
   
5. Patterns with repetition
   Sa Sa Re Re Ga Ga Ma Ma
   Sa Re Sa Re Ga Re Ga Re

Practice Tips:
• Start slow, gradually increase speed
• Use tanpura or sruti box
• Practice with metronome
• 15-30 minutes daily
• Focus on pitch accuracy

Advanced Alankars:
• Vakra (zigzag) patterns
• Gamak (oscillations)
• Meend (glides)
• Murki (fast turns)
      `,
      quiz: {
        question: 'What is the primary purpose of practicing alankars?',
        options: [
          'To memorize songs',
          'To develop voice control and note accuracy',
          'To learn rhythm',
          'To understand poetry'
        ],
        correct: 1,
      }
    },
    {
      id: 6,
      title: 'Bandish Structure',
      category: 'Advanced',
      level: 'Intermediate',
      duration: '18 min',
      icon: '🎭',
      description: 'Understanding traditional composition formats',
      content: `
Bandish (बंदिश) - Composition Structure:

A bandish is a fixed composition that serves as the foundation for improvisation.

Parts of a Bandish:

1. Sthayi (स्थायी) - First section
   • Lower-middle octave
   • Establishes the raga
   • Returns to sam

2. Antara (अंतरा) - Second section
   • Upper octave
   • Explores higher notes
   • More elaborate

3. Sanchari (संचारी) - Third section
   • Middle register (optional)
   • Transitional

4. Abhog (आभोग) - Fourth section
   • Concluding section (rare)
   • Highest notes

Types of Bandish:

Khayal (ख्याल):
• Vilambit (slow) - elaborate improvisation
• Drut (fast) - rhythmic patterns
• Most popular form

Dhrupad (ध्रुपद):
• Oldest form
• Serious, meditative
• Four parts: sthayi, antara, sanchari, abhog

Thumri (ठुमरी):
• Semi-classical
• Romantic, devotional
• More flexible with raga rules

Tarana (तराना):
• Fast, rhythmic
• Syllables: ta, na, dir, tom
• No meaningful words

Lakshan Geet (लक्षण गीत):
• Describes raga characteristics
• Educational purpose

Improvisation Techniques:
• Alap - Without rhythm
• Taan - Fast note passages
• Bol-taan - With words
• Sargam - Note names
• Layakari - Rhythmic patterns
      `,
      quiz: {
        question: 'Which is the first section of a bandish?',
        options: ['Antara', 'Sthayi', 'Sanchari', 'Abhog'],
        correct: 1,
      }
    },
    {
      id: 7,
      title: 'Gharanas (Musical Schools)',
      category: 'Advanced',
      level: 'Advanced',
      duration: '20 min',
      icon: '🏛️',
      description: 'Different traditions and styles in Indian classical music',
      content: `
Gharanas (घराना) - Musical Lineages:

A gharana is a system of social organization in Indian classical music linking musicians through lineage or apprenticeship.

Major Vocal Gharanas:

1. Gwalior Gharana
   • Oldest khayal gharana
   • Emphasis on clarity, purity
   • Balanced between melody and rhythm

2. Agra Gharana
   • Powerful voice needed
   • Gamak (ornaments)
   • Connection to dhrupad

3. Kirana Gharana
   • Focus on swara (notes)
   • Slow, elaborate alaap
   • Emotional depth
   • Famous: Bhimsen Joshi, Gangubai Hangal

4. Jaipur-Atrauli Gharana
   • Complex layakari
   • Rare ragas
   • Intricate taans
   • Famous: Kishori Amonkar

5. Patiala Gharana
   • Emotional appeal
   • Clear pronunciation
   • Romantic style

Instrumental Gharanas:

Sitar:
• Imdadkhani (Etawah)
• Maihar (Senia)
• Benares

Tabla:
• Delhi
• Ajrada
• Lucknow
• Farukhabad
• Benares
• Punjab

Sarod:
• Maihar
• Shahjahanpur

Each gharana has:
• Unique techniques
• Repertoire of compositions
• Style of presentation
• Teaching methodology
• Aesthetic preferences

Guru-Shishya Parampara:
• Traditional teacher-student relationship
• Oral transmission
• Living with guru
• Dedication and discipline
      `,
      quiz: {
        question: 'Which is considered the oldest khayal gharana?',
        options: ['Kirana', 'Gwalior', 'Agra', 'Jaipur'],
        correct: 1,
      }
    },
    {
      id: 8,
      title: 'Carnatic vs Hindustani',
      category: 'Fundamentals',
      level: 'Intermediate',
      duration: '15 min',
      icon: '🎎',
      description: 'Understanding the two major traditions of Indian classical music',
      content: `
Carnatic vs Hindustani Music:

Both are Indian classical traditions, but have distinct characteristics:

HINDUSTANI (North Indian):

Origin: Northern India
Influence: Persian, Central Asian
Ragas: Fewer (around 200 commonly used)
Structure: 10 thaats
Improvisation: Highly emphasized
Forms: Khayal, dhrupad, thumri, tarana
Instruments: Sitar, sarod, tabla, harmonium
Language: Hindi, Urdu, Sanskrit

Key Features:
• More improvisation
• Elaborate alap
• Gamak and meend
• Flexible raga structure
• Persian/Sufi influence

CARNATIC (South Indian):

Origin: Southern India
Influence: Temple music tradition
Ragas: More (72 melakarta system)
Structure: 72 melakartas
Composition: Highly emphasized
Forms: Kriti, varnam, padam
Instruments: Veena, mridangam, violin
Language: Telugu, Kannada, Tamil, Sanskrit

Key Features:
• Structured compositions
• Mathematical precision
• Complex rhythms
• Trinity of composers
• Devotional themes

SIMILARITIES:

• Based on raga and tala
• Oral tradition
• Guru-shishya parampara
• Spiritual foundation
• Sophisticated music theory
• Same fundamental swaras

Famous Musicians:
Hindustani: Ravi Shankar, Zakir Hussain, Pandit Jasraj
Carnatic: M.S. Subbulakshmi, Lalgudi Jayaraman

Both traditions are equally rich and sophisticated!
      `,
      quiz: {
        question: 'How many parent scales (thaats) are in Hindustani music?',
        options: ['10', '12', '72', '32'],
        correct: 0,
      }
    },
    {
      id: 9,
      title: 'Shruti - The Microtones',
      category: 'Advanced',
      level: 'Advanced',
      duration: '18 min',
      icon: '🎚️',
      description: 'Understanding the 22 microtones in Indian classical music',
      content: `
Shruti (श्रुति) - Microtonal System:

Indian classical music recognizes 22 shrutis (microtones) in an octave, unlike Western music's 12 semitones.

The 22 Shrutis:

Between each of the 7 swaras, there are specific shrutis:
• Sa to Re: 4 shrutis
• Re to Ga: 3 shrutis
• Ga to Ma: 2 shrutis
• Ma to Pa: 4 shrutis
• Pa to Dha: 4 shrutis
• Dha to Ni: 3 shrutis
• Ni to Sa: 2 shrutis

Understanding Shruti:

1. Shruti is NOT the same as a semitone
   • More subtle than Western half-steps
   • Perception-based intervals
   • Different from tempered tuning

2. Practical Application:
   • Singers use shrutis intuitively
   • Creates the "color" of a raga
   • Microtonal nuances matter

3. Four Categories of Shrutis:
   • Tivra (sharp/intense)
   • Kumudvati (soft/gentle)
   • Manda (slow/mild)
   • Chandovati (pleasant/delicate)

Historical Context:

• Described in Natya Shastra (200 BCE - 200 CE)
• Bharata's shruti system
• Not strictly mathematical
• Based on aesthetics and perception

Modern Interpretation:

• Some scholars debate exact frequencies
• Practical use varies by musician
• More important in vocal music
• Instruments have fixed tuning limitations

Why Shrutis Matter:

• Create raga personality
• Enable subtle expressions
• Allow for emotional nuance
• Distinguish similar ragas
• Make Indian music unique

The beauty of shruti lies in its subtlety - 
it's the space between the notes where magic happens!
      `,
      quiz: {
        question: 'How many shrutis are there in an octave in Indian classical music?',
        options: ['12', '22', '7', '16'],
        correct: 1,
      }
    },
    {
      id: 10,
      title: 'Gamak - Musical Ornamentations',
      category: 'Advanced',
      level: 'Intermediate',
      duration: '16 min',
      icon: '💫',
      description: 'Master the art of musical embellishments and ornamentations',
      content: `
Gamak (गमक) - Ornamentations:

Gamaks are embellishments that add beauty and character to notes.

Types of Gamaks:

1. Meend (मींड) - Glide
   • Smooth connection between notes
   • No break in sound
   • Sliding from one note to another
   • Essential in vocal and sitar

2. Murki (मुर्की) - Quick Turn
   • Rapid oscillation
   • Grace notes
   • Quick ornamental phrase
   • Common in thumri

3. Khatka (खटका) - Sharp Ornament
   • Quick, sharp movement
   • Adds sparkle
   • Brief touch of adjacent note
   • Used in both vocal and instrumental

4. Zamzama (ज़मज़मा) - Gentle Oscillation
   • Soft shake
   • Relaxed movement
   • Around the main note
   • Creates sweetness

5. Andolan (आंदोलन) - Oscillation
   • Controlled vibrato
   • Between two notes
   • Creates tension and release
   • Different from Western vibrato

6. Kan (कण) - Grace Note
   • Very brief touch
   • Fleeting note
   • Adds color
   • Like a musical wink

7. Krintan (कृन्तन) - Straight Note
   • Clean, direct attack
   • No ornament
   • Used for emphasis
   • Contrast to gamakas

8. Kampan (कम्पन) - Vibrato
   • Oscillation on single note
   • Adds warmth
   • Control is crucial
   • Different speeds for effect

Usage in Different Styles:

Hindustani Music:
• More use of meend
• Elaborate gamakas
• Freedom in application

Carnatic Music:
• Complex gamaka patterns
• More structured
• Integral to raga identity
• Specific gamakas for each raga

Practice Tips:

• Start with simple meend
• Practice slowly with tanpura
• Record and listen
• Each gamak needs control
• Less is often more
• Appropriate to raga character

Common Mistakes:

• Over-ornamentation
• Loss of clarity
• Inappropriate timing
• Losing pitch center
• Mechanical execution

Remember: Gamaks should enhance, not overwhelm the music!
      `,
      quiz: {
        question: 'What is "meend" in Indian classical music?',
        options: [
          'A type of rhythm',
          'A smooth glide between notes',
          'A musical form',
          'A type of drum'
        ],
        correct: 1,
      }
    },
    {
      id: 11,
      title: 'Raga Time Theory',
      category: 'Ragas',
      level: 'Intermediate',
      duration: '20 min',
      icon: '🌅',
      description: 'Deep dive into the concept of time in raga performance',
      content: `
Raga Time Theory (समय सिद्धांत):

Indian classical music associates specific ragas with times of day and seasons.

Samay Chakra (Time Wheel):

The 24-hour day is divided into 8 praharas (3-hour periods):

MORNING RAGAS (6 AM - 12 PM):
• Peaceful, devotional mood
• Fresh energy
• Examples: Bhairav, Todi, Ramkali, Bhupali

Characteristics:
• Use of komal Re and Dha
• Serious, contemplative
• Meditative quality

AFTERNOON RAGAS (12 PM - 3 PM):
• Bright, energetic
• Examples: Sarang, Multani

LATE AFTERNOON (3 PM - 6 PM):
• Transitional period
• Examples: Patdeep, Puriya

EVENING RAGAS (6 PM - 9 PM):
• Romantic, devotional
• Most popular time
• Examples: Yaman, Puriya Dhanashree, Marwa

Characteristics:
• Use of teevra Ma
• Emotional depth
• Beautiful, contemplative

NIGHT RAGAS (9 PM - 12 AM):
• Deep, serious
• Contemplative
• Examples: Darbari Kanada, Malkauns, Bageshri

Characteristics:
• Heavy, serious mood
• Slow tempo preferred
• Rich emotional content

LATE NIGHT/MIDNIGHT (12 AM - 3 AM):
• Very serious, meditative
• Examples: Malkauns, Chandrakauns

EARLY MORNING (3 AM - 6 AM):
• Pre-dawn ragas
• Peaceful, spiritual
• Examples: Lalit, Ramkali

Scientific Basis:

• Based on natural cycles
• Human mood and energy levels
• Temperature and light
• Acoustic properties of time
• Psychological effects

Seasonal Ragas:

MONSOON (वर्षा ऋतु):
• Megh, Mian ki Malhar, Gaud Malhar
• Evoke rain, clouds

SPRING (वसंत ऋतु):
• Basant, Bahar
• Joyful, colorful

SUMMER (ग्रीष्म ऋतु):
• Ragas with cooling effect

WINTER (शिशिर ऋतु):
• Warming, comforting ragas

Modern Practice:

• Concert timings not always traditional
• Artistic license vs tradition
• Morning ragas in evening concerts
• Adaptation to modern lifestyle

Why Time Matters:

• Enhances raga's effect
• Natural resonance
• Deeper emotional impact
• Traditional aesthetic
• Holistic musical experience

Expert musicians can evoke the appropriate time 
regardless of actual time - this is true mastery!
      `,
      quiz: {
        question: 'Which is the most popular time for evening ragas?',
        options: [
          '3 PM - 6 PM',
          '6 PM - 9 PM',
          '9 PM - 12 AM',
          '12 AM - 3 AM'
        ],
        correct: 1,
      }
    },
    {
      id: 12,
      title: 'Vocal Techniques',
      category: 'Fundamentals',
      level: 'Intermediate',
      duration: '22 min',
      icon: '🎤',
      description: 'Essential techniques for classical vocal music',
      content: `
Vocal Techniques in Indian Classical Music:

Proper technique is essential for developing a strong, flexible voice.

Basic Techniques:

1. Sur (स्वर) - Pitch
   • Fundamental requirement
   • Perfect pitch matching
   • Shruti awareness
   • Tanpura as reference

2. Laya (लय) - Rhythm
   • Maintaining tempo
   • Rhythmic awareness
   • Alignment with tabla
   • Internal pulse

3. Bol (बोल) - Pronunciation
   • Clear diction
   • Meaningful expression
   • Consonant clarity
   • Vowel purity

Breathing Techniques:

1. Diaphragmatic Breathing:
   • Breathe from abdomen
   • Not from chest
   • Controlled release
   • Support for long phrases

2. Breath Control (प्राणायाम):
   • Long sustained notes
   • Managing phrases
   • No audible gasps
   • Smooth transitions

3. Circular Breathing:
   • Advanced technique
   • Continuous sound
   • Used in long alaps
   • Requires practice

Voice Development:

1. Lower Register (मंद्र सप्तक):
   • Chest voice
   • Resonance in chest
   • Power and depth
   • Foundation work

2. Middle Register (मध्य सप्तक):
   • Most used range
   • Natural speaking voice
   • Clarity essential
   • Main working area

3. Upper Register (तार सप्तक):
   • Head voice
   • Resonance in head
   • Requires control
   • Practice with care

Vocal Exercises (रियाज़):

1. Daily Practice Routine:
   • Warm up with Sa
   • Sargam practice
   • Alankar exercises
   • Raga practice
   • Cool down

2. Sa-Pa Exercise:
   • Foundation exercise
   • Builds stability
   • Perfect fifth interval
   • 15-30 minutes daily

3. Layakari Practice:
   • Different tempos
   • Rhythm patterns
   • Develops precision
   • Essential skill

Advanced Techniques:

1. Taan (तान):
   • Fast note passages
   • Requires stamina
   • Practice slowly first
   • Build speed gradually

2. Sargam (सरगम):
   • Singing note names
   • Clarity of notes
   • Rhythmic precision
   • Important skill

3. Bol-taan (बोल-तान):
   • Fast singing with words
   • Difficult technique
   • Clear pronunciation
   • Athletic vocal skill

Voice Care:

DO's:
• Drink warm water
• Steam inhalation
• Rest your voice
• Healthy diet
• Regular practice
• Proper sleep

DON'Ts:
• Cold drinks before singing
• Shouting or straining
• Smoking
• Excessive caffeine
• Singing when sick
• Late night practice

Common Problems:

1. Pitch Problems:
   • Practice with tanpura
   • Slow sustained notes
   • Ear training

2. Voice Breaks:
   • Register transition work
   • Sirens exercise
   • Patient practice

3. Breathlessness:
   • Breathing exercises
   • Shorter phrases initially
   • Build stamina

4. Strain:
   • Relax tension
   • Proper posture
   • Don't force

Remember: Your voice is your instrument - 
treat it with care and respect!

Guru Guidance:
• Essential for proper technique
• Personalized corrections
• Prevents bad habits
• Traditional knowledge
      `,
      quiz: {
        question: 'What is the middle register called in Indian classical music?',
        options: [
          'Mandra Saptak',
          'Madhya Saptak',
          'Taar Saptak',
          'Ati Taar'
        ],
        correct: 1,
      }
    },
    {
      id: 13,
      title: 'Popular Ragas Deep Dive',
      category: 'Ragas',
      level: 'Intermediate',
      duration: '25 min',
      icon: '⭐',
      description: 'Detailed study of the most important ragas',
      content: `
In-Depth Study of Popular Ragas:

1. RAGA YAMAN (यमन)
Thaat: Kalyan
Time: Evening (6-9 PM)
Nature: Peaceful, devotional
Aroha: N R G M̄ P D N S'
Avaroha: S' N D P M̄ G R S
Vadi: G | Samvadi: N
All shuddha notes except teevra Ma
Most popular evening raga
Ideal for beginners

2. RAGA BHAIRAV (भैरव)
Thaat: Bhairav
Time: Early morning (6-9 AM)
Nature: Serious, majestic
Aroha: S r G M P d N S'
Avaroha: S' N d P M G r S
Vadi: D | Samvadi: r
Komal Re and Dha
Ancient, powerful raga
Very devotional

3. RAGA BHUPALI/BHOOP (भूपाली)
Thaat: Kalyan
Time: Evening/Night
Nature: Peaceful, pentatonic
Aroha: S R G P D S'
Avaroha: S' D P G R S
Vadi: G | Samvadi: D
5 notes (Audava)
No Ma or Ni
Sweet, simple
Folk connections

4. RAGA DARBARI KANADA (दरबारी कानड़ा)
Thaat: Asavari
Time: Late night (10 PM-12 AM)
Nature: Serious, majestic, heavy
Aroha: S R g M P g M d n S'
Avaroha: S' n d P M P g M g R S
Vadi: R | Samvadi: P
Komal Ga, Dha, Ni
King of ragas
Requires maturity
Slow tempo preferred

5. RAGA MALKAUNS (मालकौंस)
Thaat: Bhairavi
Time: Late night/Midnight
Nature: Deep, serious
Aroha: S g M d n S'
Avaroha: S' n d M g S
Vadi: M | Samvadi: S
5 notes (no Re or Pa)
Komal Ga, Dha, Ni
Very powerful
Meditative quality

6. RAGA BAGESHRI (बागेश्री)
Thaat: Kafi
Time: Late night (9 PM-12 AM)
Nature: Romantic, devotional
Aroha: S G M D N S'
Avaroha: S' N d M g M R S
Vadi: M | Samvadi: S
Komal Ga and Dha
Beautiful, emotional
Popular in concerts

7. RAGA TODI (टोडी)
Thaat: Todi
Time: Late morning (10 AM-1 PM)
Nature: Serious, complex
Aroha: S r g m̄ P d N S'
Avaroha: S' N d P m̄ g r S
Vadi: d | Samvadi: g
Komal Re, Ga, Dha; Teevra Ma
Very complex
Requires expertise

8. RAGA DES (देस)
Thaat: Khamaj
Time: Late night
Nature: Light, romantic
Aroha: S R G M P N S'
Avaroha: S' n d P M G R G S
Vadi: R | Samvadi: P
Komal Ni in descent
Semi-classical feel
Popular in light music

Learning Strategy:

Beginner Level:
• Start with Yaman
• Then Bhupali
• Learn thoroughly

Intermediate:
• Bhairav
• Bageshri
• Build repertoire

Advanced:
• Darbari Kanada
• Todi
• Complex ragas

Practice Tips:

1. Learn one raga completely
   • Aroha-Avaroha
   • Pakad phrases
   • Multiple bandishes
   • Listen extensively

2. Compare similar ragas
   • Note the differences
   • Pakad distinguishes
   • Time theory

3. Immerse yourself
   • Listen to masters
   • Attend concerts
   • Daily practice
   • Feel the raga

Each raga is a world - explore deeply!
      `,
      quiz: {
        question: 'Which raga is known as the "King of Ragas"?',
        options: ['Yaman', 'Bhairav', 'Darbari Kanada', 'Todi'],
        correct: 2,
      }
    },
    {
      id: 14,
      title: 'Tabla & Rhythm Instruments',
      category: 'Taals',
      level: 'Intermediate',
      duration: '20 min',
      icon: '🪘',
      description: 'Understanding percussion instruments in Indian classical music',
      content: `
Tabla & Percussion Instruments:

TABLA (तबला):

The tabla is the most popular percussion instrument in Hindustani music.

Parts of Tabla:

1. Dayan (दायाँ) - Right drum
   • Higher pitch
   • Made of wood
   • Tuned to Sa or Pa
   • Creates melodic sounds

2. Bayan (बायाँ) - Left drum
   • Lower pitch
   • Made of metal
   • Bass sounds
   • Adds depth

Tabla Bols (Syllables):

Dayan Bols:
• Na - Open resonant
• Tin - Closed, sharp
• Ta - Closed
• Ti - Light touch
• Tet - Combination
• Tun - Deep

Bayan Bols:
• Ge/Ga - Bass open
• Ke/Ka - Bass closed

Combined Bols:
• Dha = Na + Ge (most common)
• Dhin = Tin + Ge
• Dhere = Na + Ke
• Ta = Ta (dayan only)

Common Tabla Compositions:

1. TEENTAL THEKA:
Dha Dhin Dhin Dha | Dha Dhin Dhin Dha
Dha Tin Tin Ta | Ta Dhin Dhin Dha

2. JHAPTAAL THEKA:
Dhi Na | Dhi Dhi Na | Ti Na | Dhi Dhi Na

3. EKTAAL THEKA:
Dhin Dhin | DhaGe TiRaKiTa | TuNa | KaTa...

Playing Techniques:

1. Basic Strokes:
   • Finger position
   • Hand angle
   • Pressure control
   • Clarity of sound

2. Compositions:
   • Kayda - Theme and variation
   • Rela - Continuous flow
   • Tukra - Short composition
   • Chakradar - Circular pattern
   • Gat - Accompaniment style

OTHER PERCUSSION:

1. MRIDANGAM (मृदंगम) - Carnatic
   • Single barrel drum
   • Both ends played
   • More complex bols
   • South Indian classical

2. PAKHAWAJ (पखावज) - Hindustani
   • Older than tabla
   • Used in Dhrupad
   • Deeper sound
   • More serious music

3. GHATAM (घटम) - Carnatic
   • Clay pot
   • Unique timbre
   • Finger techniques
   • Accompaniment

4. KANJIRA (कंजीरा) - Carnatic
   • Frame drum
   • Lizard skin
   • Jingles
   • Rhythmic accents

5. DHOLAK (ढोलक)
   • Folk instrument
   • Used in light music
   • Hand played
   • Popular in Bhajans

Learning Tabla:

Starting Out:
• Find good teacher
• Practice bols daily
• Hand positioning crucial
• Build gradually

Practice Routine:
1. Warm up exercises
2. Basic bols (Thakas)
3. Simple compositions
4. Theka practice
5. Cool down

Important Concepts:

1. Sam (सम):
   • First beat
   • Most crucial
   • Compositions resolve on sam
   • Must never be missed

2. Tali-Khali:
   • Emphasized vs quiet beats
   • Structure of taal
   • Visual cues (clap-wave)

3. Lay (लय):
   • Single tempo (Ekgun)
   • Double tempo (Dugun)
   • Triple tempo (Tigun)
   • Quadruple (Chaugun)

4. Vilambit-Madhya-Drut:
   • Slow-Medium-Fast
   • Different techniques
   • Various aesthetics

Solo Performance:

• Tabla solo is an art form
• Extensive repertoire
• Improvisation skills
• Rhythmic creativity
• Mathematical precision

Famous Tabla Players:
• Ustad Zakir Hussain
• Ustad Allah Rakha
• Pandit Kumar Bose
• Pandit Anindo Chatterjee
• Ustad Sabir Khan

Accompaniment Skills:

• Supporting vocalist/instrumentalist
• Sensitivity to music
• Matching intensity
• Creative support
• Not overshadowing

Rhythm is the heartbeat of music - 
tabla brings it to life!
      `,
      quiz: {
        question: 'What are the two parts of the tabla called?',
        options: [
          'Left and Right',
          'Dayan and Bayan',
          'High and Low',
          'Male and Female'
        ],
        correct: 1,
      }
    },
    {
      id: 15,
      title: 'Improvisation Techniques',
      category: 'Advanced',
      level: 'Advanced',
      duration: '25 min',
      icon: '🎨',
      description: 'Mastering the art of musical improvisation in classical music',
      content: `
Improvisation in Indian Classical Music:

Improvisation (मनोरंजन) is the heart and soul of Indian classical music.

ALAP (आलाप):

1. Vilambit Alap (Slow):
   • No rhythm
   • Free form
   • Note by note exploration
   • Establishes raga mood
   • Meditative quality

Structure:
• Start with lower notes
• Gradual development
• Explore raga phrases
• Build intensity slowly
• Can last 30-60 minutes

2. Madhya Laya Alap:
   • Medium tempo
   • Introduction of rhythm sense
   • More structured
   • Preparation for composition

3. Drut Alap:
   • Fast tempo
   • Rhythmic patterns
   • Energetic
   • Leads to composition

TAAN (तान):

Fast passages showcasing virtuosity and raga knowledge.

Types of Taans:

1. Sapat Taan (सपाट तान):
   • Straight, simple
   • Sequential notes
   • Sa Re Ga Ma Pa type
   • Foundation taan

2. Koot Taan (कूट तान):
   • Zigzag pattern
   • Non-sequential
   • Sa Ga Re Ma type
   • More complex

3. Sargam Taan (सरगम तान):
   • Using note names
   • Sa Re Ga Ma Pa...
   • Clear pronunciation
   • Both slow and fast

4. Bol Taan (बोल तान):
   • With composition words
   • Very difficult
   • Clarity crucial
   • Impressive skill

5. Gamak Taan (गमक तान):
   • With ornaments
   • Oscillations
   • Beautiful sound
   • Requires control

6. Jod Taan (जोड़ तान):
   • Connected phrases
   • Continuous flow
   • No breaks
   • Advanced technique

7. Firdha Taan (फिर्धा तान):
   • Circular pattern
   • Returns to starting note
   • Complex mathematics
   • Very impressive

8. Sapaat-Koot Mixed:
   • Combination
   • Variety
   • Keeps interest
   • Most common

LAYAKARI (लयकारी):

Rhythmic improvisation and play.

Techniques:

1. Different Lays:
   • Barabar (straight)
   • Dugun (double)
   • Tigun (triple)
   • Chaugun (quadruple)

2. Bol-Baant (बोल-बांट):
   • Division of words
   • Rhythmic patterns
   • With bandish words
   • Creative distribution

3. Bol-Banaav (बोल-बनाव):
   • Playing with words
   • Permutations
   • Creative arrangements
   • Rhythmic creativity

SARGAM (सरगम):

Improvisation using note names.

Techniques:
• Clear pronunciation
• Rhythmic precision
• Melodic sense
• Raga boundaries
• Sam awareness

Benefits:
• Demonstrates knowledge
• Clear notes
• Educational value
• Impressive skill

AALAP-JAALAA (Instrumental):

Dhrupad style improvisation:

1. Alap Section:
   • Very slow
   • No rhythm
   • Pure notes
   • Meditative

2. Jod Section:
   • Introduces pulse
   • Still no tabla
   • Rhythmic sense
   • Building energy

3. Jhala Section:
   • Fast tempo
   • Rhythmic patterns
   • Drone strings
   • Climactic

PRINCIPLES OF GOOD IMPROVISATION:

1. Raga Purity:
   • Stay within raga
   • Use characteristic phrases
   • Maintain mood
   • Don't mix ragas

2. Rhythmic Awareness:
   • Know where sam is
   • Use rhythmic patterns
   • Play with tabla
   • Create tension-release

3. Gradual Development:
   • Start simple
   • Build complexity
   • Create arc
   • Save best for last

4. Listening:
   • Listen to accompaniment
   • Respond musically
   • Create dialogue
   • Ensemble unity

5. Creativity within Tradition:
   • Respect raga rules
   • Find new phrases
   • Personal expression
   • Authentic creativity

PRACTICE STRATEGIES:

1. Learn Bandish Well:
   • Strong foundation
   • Multiple compositions
   • Various ragas

2. Practice Small Ideas:
   • Develop phrases
   • Combine creatively
   • Build vocabulary

3. Listen Extensively:
   • Learn from masters
   • Understand styles
   • Absorb tradition

4. Record Yourself:
   • Self-assessment
   • Identify weaknesses
   • Track progress

5. Perform Regularly:
   • Develop confidence
   • Learn from experience
   • Audience feedback

Common Mistakes:

• Going outside raga
• Losing sam
• Over-complication
• Copying without understanding
• Neglecting bandish
• Too much too soon
• Mechanical improvisation

Remember: Improvisation should sound spontaneous 
yet be grounded in deep knowledge and practice.

True improvisation comes from years of:
• Riyaaz (practice)
• Listening
• Contemplation
• Performance
• Guru guidance

It's both science and art - discipline and freedom!
      `,
      quiz: {
        question: 'What is alap in Indian classical music?',
        options: [
          'A fast composition',
          'A rhythmic cycle',
          'Free-form improvisation without rhythm',
          'A type of drum'
        ],
        correct: 2,
      }
    },
    {
      id: 16,
      title: 'Musical Instruments',
      category: 'Fundamentals',
      level: 'Beginner',
      duration: '18 min',
      icon: '🎻',
      description: 'Overview of instruments used in Indian classical music',
      content: `
Musical Instruments in Indian Classical Music:

Indian classical music uses a rich variety of instruments across categories.

CLASSIFICATION (संगीत वाद्य):

Four categories based on sound production:

1. TATA VADYA (तत वाद्य) - String Instruments
2. SUSHIR VADYA (सुषिर वाद्य) - Wind Instruments
3. AVANADDHA VADYA (अवनद्ध वाद्य) - Membrane Instruments
4. GHANA VADYA (घन वाद्य) - Solid/Idiophones

STRING INSTRUMENTS:

1. SITAR (सितार):
   • Most popular Hindustani instrument
   • 18-21 strings
   • Sympathetic strings (tarab)
   • Movable frets
   • Rich sound
   • Famous: Ravi Shankar, Vilayat Khan

2. SAROD (सरोद):
   • Fretless, smooth fingerboard
   • Metal strings
   • Deep, penetrating sound
   • 25 strings total
   • Famous: Amjad Ali Khan, Ali Akbar Khan

3. VEENA (वीणा):
   • Ancient instrument
   • Carnatic tradition
   • 24 frets
   • Goddess Saraswati's instrument
   • Rich, mellow tone

4. SANTOOR (संतूर):
   • Hammered dulcimer
   • 100+ strings
   • Kashmiri origin
   • Crystalline sound
   • Famous: Shiv Kumar Sharma

5. VIOLIN (वायलिन):
   • Used in both traditions
   • Carnatic: sitting position
   • Hindustani: adapted
   • Versatile instrument

6. SARANGI (सारंगी):
   • Bowed instrument
   • Most human-like sound
   • Complex to play
   • Accompaniment instrument
   • Famous: Ustad Sultan Khan

7. TANPURA (तानपूरा):
   • Drone instrument
   • Provides tonal foundation
   • 4-6 strings
   • Essential in all concerts
   • Creates harmonic base

WIND INSTRUMENTS:

1. BANSURI (बांसुरी):
   • Bamboo flute
   • Side-blown
   • Sweet, melodious
   • Lord Krishna's instrument
   • Famous: Hariprasad Chaurasia

2. SHEHNAI (शहनाई):
   • Double-reed instrument
   • Auspicious occasions
   • Penetrating sound
   • North Indian
   • Famous: Bismillah Khan

3. NADASWARAM (நாதஸ்வரம்):
   • South Indian equivalent
   • Temple music
   • Very loud
   • Auspicious
   • Carnatic tradition

4. HARMONIUM (हारमोनियम):
   • Keyboard instrument
   • Bellows operated
   • Popular in light music
   • Controversial in pure classical
   • Very common accompaniment

PERCUSSION INSTRUMENTS:

1. TABLA (तबला):
   • Most popular Hindustani
   • Dayan and Bayan
   • Complex rhythms
   • Versatile
   • Both solo and accompaniment

2. MRIDANGAM (மிருதங்கம்):
   • Carnatic percussion
   • Barrel-shaped
   • Both ends played
   • Complex patterns
   • Sacred instrument

3. PAKHAWAJ (पखावज):
   • Dhrupad accompaniment
   • Older than tabla
   • Deeper sound
   • Traditional

4. GHATAM (घடம்):
   • Clay pot
   • Unique sound
   • Carnatic
   • Finger techniques

5. MANJIRA (मंजीरा):
   • Small cymbals
   • Bhajan/Kirtan
   • Rhythm keeping
   • Simple but essential

SOLID/IDIOPHONES:

1. Ghungroo (घुंग्रू):
   • Ankle bells
   • Dance accompaniment
   • Kathak, Bharatanatyam

2. Kartal (करताल):
   • Wooden clappers
   • Devotional music
   • Folk traditions

LEARNING AN INSTRUMENT:

Choosing Your Instrument:

Consider:
• Musical preference
• Physical capability
• Teacher availability
• Budget
• Dedication level

Starting Out:

1. Find Good Teacher:
   • Traditional training
   • Guru-shishya parampara
   • Regular lessons
   • Patient guidance

2. Daily Practice (रियाज़):
   • Start 30 minutes
   • Build to 2-3 hours
   • Consistency crucial
   • Morning practice best

3. Basic Exercises:
   • Alankars
   • Scale practice
   • Technique building
   • Slow and steady

4. Learn Gradually:
   • Don't rush
   • Build foundation
   • Master basics
   • Respect the process

Instrument Care:

• Proper storage
• Regular maintenance
• Climate control
• Clean after playing
• Professional repair when needed

Modern Developments:

• Electric versions
• Synthesizers
• MIDI integration
• Recording technology
• New experimental instruments

Famous Instrument Makers:

• Sitar: Kanailal, Rikhi Ram
• Tabla: Haridas Vhatkar
• Bansuri: Craft makers
• Quality matters!

Instrument as Extension:

• Years to master
• Personal relationship
• Becomes part of you
• Lifetime journey

Each instrument has its:
• Unique voice
• Technical challenges
• Repertoire
• Masters
• Tradition

Choose what calls to your heart!
      `,
      quiz: {
        question: 'What is the drone instrument that provides tonal foundation?',
        options: ['Sitar', 'Tanpura', 'Sarod', 'Veena'],
        correct: 1,
      }
    },
  ];

  const filteredLessons = selectedCategory === 'All' 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const toggleLesson = (lessonId) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  const openQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setQuizAnswer(null);
    setShowQuizModal(true);
  };

  const checkAnswer = (answerIndex) => {
    setQuizAnswer(answerIndex);
  };

  const searchYouTube = (topic) => {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' Indian classical music tutorial')}`;
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📖 Theory Lessons</Text>
        <Text style={styles.subtitle}>
          Learn the fundamentals of Indian classical music
        </Text>
      </View>

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive
            ]}
            onPress={() => setSelectedCategory(category)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lessons List */}
      <ScrollView 
        style={styles.lessonsScroll}
        contentContainerStyle={styles.lessonsContainer}
        showsVerticalScrollIndicator={true}
      >
        {filteredLessons.map((lesson) => (
          <View key={lesson.id} style={styles.lessonCard}>
            {/* Lesson Header */}
            <TouchableOpacity
              style={styles.lessonHeader}
              onPress={() => toggleLesson(lesson.id)}
              activeOpacity={0.8}
            >
              <View style={styles.lessonHeaderLeft}>
                <Text style={styles.lessonIcon}>{lesson.icon}</Text>
                <View style={styles.lessonHeaderText}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <View style={styles.lessonMeta}>
                    <View style={[styles.levelBadge, styles[`level${lesson.level.replace(' ', '')}`]]}>
                      <Text style={styles.levelText}>{lesson.level}</Text>
                    </View>
                    <Text style={styles.duration}>⏱️ {lesson.duration}</Text>
                  </View>
                </View>
              </View>
              <Ionicons 
                name={expandedLesson === lesson.id ? "chevron-up" : "chevron-down"} 
                size={24} 
                color="#888" 
              />
            </TouchableOpacity>

            <Text style={styles.lessonDescription}>{lesson.description}</Text>

            {/* Expanded Content */}
            {expandedLesson === lesson.id && (
              <View style={styles.lessonContent}>
                <ScrollView 
                  style={styles.contentScroll}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={styles.contentText}>{lesson.content.trim()}</Text>
                </ScrollView>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.youtubeButton}
                    onPress={() => searchYouTube(lesson.title)}
                  >
                    <Ionicons name="logo-youtube" size={18} color="#FF0000" />
                    <Text style={styles.youtubeButtonText}>Watch on YouTube</Text>
                  </TouchableOpacity>

                  {lesson.quiz && (
                    <TouchableOpacity
                      style={styles.quizButton}
                      onPress={() => openQuiz(lesson.quiz)}
                    >
                      <Ionicons name="school" size={18} color="#fff" />
                      <Text style={styles.quizButtonText}>Take Quiz</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Quiz Modal */}
      <Modal
        visible={showQuizModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowQuizModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🎯 Quick Quiz</Text>
            
            {currentQuiz && (
              <>
                <Text style={styles.quizQuestion}>{currentQuiz.question}</Text>
                
                <View style={styles.quizOptions}>
                  {currentQuiz.options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.quizOption,
                        quizAnswer === index && (
                          index === currentQuiz.correct 
                            ? styles.quizOptionCorrect 
                            : styles.quizOptionWrong
                        ),
                        quizAnswer !== null && index === currentQuiz.correct && styles.quizOptionCorrect
                      ]}
                      onPress={() => checkAnswer(index)}
                      disabled={quizAnswer !== null}
                    >
                      <Text style={[
                        styles.quizOptionText,
                        (quizAnswer === index || (quizAnswer !== null && index === currentQuiz.correct)) 
                          && styles.quizOptionTextActive
                      ]}>
                        {option}
                      </Text>
                      {quizAnswer !== null && index === currentQuiz.correct && (
                        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                      )}
                      {quizAnswer === index && index !== currentQuiz.correct && (
                        <Ionicons name="close-circle" size={24} color="#F44336" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>

                {quizAnswer !== null && (
                  <Text style={[
                    styles.quizFeedback,
                    quizAnswer === currentQuiz.correct ? styles.correctFeedback : styles.wrongFeedback
                  ]}>
                    {quizAnswer === currentQuiz.correct 
                      ? '✅ Correct! Great job!' 
                      : '❌ Not quite. Try again!'}
                  </Text>
                )}
              </>
            )}

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowQuizModal(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
  },
  categoryScroll: {
    maxHeight: 60,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 10,
  },
  categoryChip: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#333',
  },
  categoryChipActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ccc',
  },
  categoryTextActive: {
    color: '#fff',
  },
  lessonsScroll: {
    flex: 1,
  },
  lessonsContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  lessonCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  lessonHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  lessonHeaderText: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  levelBeginner: {
    backgroundColor: '#4CAF50',
  },
  levelIntermediate: {
    backgroundColor: '#FF9800',
  },
  levelAdvanced: {
    backgroundColor: '#F44336',
  },
  levelText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
  },
  duration: {
    fontSize: 12,
    color: '#888',
  },
  lessonDescription: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
    marginBottom: 12,
  },
  lessonContent: {
    marginTop: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  contentScroll: {
    maxHeight: 400,
    marginBottom: 16,
  },
  contentText: {
    fontSize: 14,
    color: '#ddd',
    lineHeight: 24,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  youtubeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 8,
  },
  youtubeButtonText: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: '600',
  },
  quizButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#667eea',
    padding: 12,
    borderRadius: 8,
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 500,
    borderWidth: 2,
    borderColor: '#667eea',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  quizQuestion: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 24,
    lineHeight: 26,
  },
  quizOptions: {
    gap: 12,
    marginBottom: 20,
  },
  quizOption: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizOptionCorrect: {
    backgroundColor: '#1b4d1b',
    borderColor: '#4CAF50',
  },
  quizOptionWrong: {
    backgroundColor: '#4d1b1b',
    borderColor: '#F44336',
  },
  quizOptionText: {
    fontSize: 16,
    color: '#ccc',
    flex: 1,
  },
  quizOptionTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  quizFeedback: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
  },
  correctFeedback: {
    color: '#4CAF50',
    backgroundColor: '#1b4d1b',
  },
  wrongFeedback: {
    color: '#F44336',
    backgroundColor: '#4d1b1b',
  },
  modalCloseButton: {
    backgroundColor: '#667eea',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

