import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/Book.js';
import connectDB from './config/db.js';

dotenv.config();

const books = [
  {
    title: 'The Bhagavad Gita',
    slug: 'the-bhagavad-gita',
    author: 'Vyasa',
    description: 'Ancient Sanskrit scripture that is part of the Hindu epic Mahabharata. A conversation between Prince Arjuna and Lord Krishna about duty, righteousness, and the nature of life.',
    category: 'Devotional',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
    readLink: 'https://fliphtml5.com/dtmrm/ykca/Social_Studies_%28Nepali%29/',
    format: 'PDF',
    fileSize: '3.2 MB',
    pages: 320,
  },
  {
    title: 'The Alchemist',
    slug: 'the-alchemist',
    author: 'Paulo Coelho',
    description: 'A magical story about following your dreams. Santiago, a shepherd boy, travels from Spain to Egypt in search of treasure and discovers the true meaning of life.',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    readLink: 'https://fliphtml5.com/dpxum/ggmn/lamplighter_2025_sep-oct_digital/',
    format: 'EPUB',
    fileSize: '2.8 MB',
    pages: 208,
  },
  {
    title: 'Atomic Habits',
    slug: 'atomic-habits',
    author: 'James Clear',
    description: 'A proven framework for improving every day. Learn how tiny changes in your behavior can lead to remarkable results and transform your life.',
    category: 'Self-Help',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    readLink: 'https://online.fliphtml5.com/dxqmk/edsj/#google_vignette',
    format: 'PDF',
    fileSize: '4.1 MB',
    pages: 320,
  },
  {
    title: 'Rich Dad Poor Dad',
    slug: 'rich-dad-poor-dad',
    author: 'Robert Kiyosaki',
    description: 'What the rich teach their kids about money that the poor and middle class do not. A revolutionary guide to financial independence.',
    category: 'Money & Finance',
    image: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=400',
    readLink: 'https://fliphtml5.com/dtmrm/xszs/4._One-act_Plays/',
    format: 'PDF',
    fileSize: '3.5 MB',
    pages: 336,
  },
  {
    title: 'Thinking, Fast and Slow',
    slug: 'thinking-fast-and-slow',
    author: 'Daniel Kahneman',
    description: 'Explores the two systems that drive the way we think: System 1 is fast and emotional; System 2 is slower and more logical.',
    category: 'Psychology',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
    format: 'EPUB',
    fileSize: '5.2 MB',
    pages: 499,
  },
  {
    title: 'The Power of Now',
    slug: 'the-power-of-now',
    author: 'Eckhart Tolle',
    description: 'A guide to spiritual enlightenment and living in the present moment. Discover how to free yourself from the prison of time.',
    category: 'Self-Help',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
    format: 'PDF',
    fileSize: '2.9 MB',
    pages: 236,
  },
  {
    title: 'Harry Potter and the Philosopher\'s Stone',
    slug: 'harry-potter-and-the-philosophers-stone',
    author: 'J.K. Rowling',
    description: 'The magical journey begins as Harry Potter discovers he is a wizard and enters Hogwarts School of Witchcraft and Wizardry.',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400',
    format: 'EPUB',
    fileSize: '3.8 MB',
    pages: 309,
  },
  {
    title: 'Ramcharitmanas',
    slug: 'ramcharitmanas',
    author: 'Tulsidas',
    description: 'An epic poem in Awadhi language that narrates the life of Lord Rama. One of the most revered texts in Hinduism.',
    category: 'Devotional',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    format: 'PDF',
    fileSize: '4.5 MB',
    pages: 450,
  },
  {
    title: 'The Intelligent Investor',
    slug: 'the-intelligent-investor',
    author: 'Benjamin Graham',
    description: 'The definitive book on value investing. A book of practical counsel that has guided generations of investors.',
    category: 'Money & Finance',
    image: 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=400',
    format: 'PDF',
    fileSize: '6.1 MB',
    pages: 623,
  },
  {
    title: 'Man\'s Search for Meaning',
    slug: 'mans-search-for-meaning',
    author: 'Viktor Frankl',
    description: 'A psychiatrist\'s memoir of life in Nazi death camps and its lessons for spiritual survival. Find meaning in life even in the most difficult circumstances.',
    category: 'Psychology',
    image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400',
    format: 'EPUB',
    fileSize: '2.1 MB',
    pages: 184,
  },
  {
    title: 'The Complete Works of Shakespeare',
    slug: 'the-complete-works-of-shakespeare',
    author: 'William Shakespeare',
    description: 'The collected plays, sonnets, and poems of the greatest writer in the English language. Essential for literature students.',
    category: 'Educational',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400',
    format: 'PDF',
    fileSize: '8.5 MB',
    pages: 1264,
  },
  {
    title: 'Think and Grow Rich',
    slug: 'think-and-grow-rich',
    author: 'Napoleon Hill',
    description: 'The 13 proven steps to riches. Based on interviews with successful people, this book reveals the secret to wealth and success.',
    category: 'Money & Finance',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    format: 'PDF',
    fileSize: '2.7 MB',
    pages: 238,
  },
  {
    title: 'The Power of Your Subconscious Mind',
    slug: 'the-power-of-your-subconscious-mind',
    author: 'Joseph Murphy',
    description: 'Learn how to harness the power of your subconscious mind to achieve success, happiness, and prosperity.',
    category: 'Self-Help',
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400',
    format: 'EPUB',
    fileSize: '2.3 MB',
    pages: 256,
  },
  {
    title: 'The Psychology of Money',
    slug: 'the-psychology-of-money',
    author: 'Morgan Housel',
    description: 'Timeless lessons on wealth, greed, and happiness. How we think about money and what we do with it matters more than what we know.',
    category: 'Psychology',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400',
    format: 'PDF',
    fileSize: '3.4 MB',
    pages: 252,
  },
  {
    title: 'A Brief History of Time',
    slug: 'a-brief-history-of-time',
    author: 'Stephen Hawking',
    description: 'From the Big Bang to black holes, an exploration of the nature of time and the universe by one of the greatest minds.',
    category: 'Educational',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    format: 'PDF',
    fileSize: '4.8 MB',
    pages: 256,
  },
  {
    title: 'The 7 Habits of Highly Effective People',
    slug: 'the-7-habits-of-highly-effective-people',
    author: 'Stephen Covey',
    description: 'Powerful lessons in personal change. A holistic approach to effectiveness in all aspects of life.',
    category: 'Self-Help',
    image: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=400',
    format: 'EPUB',
    fileSize: '3.9 MB',
    pages: 381,
  },
];

const importData = async () => {
  try {
    await connectDB();
    
    await Book.deleteMany();
    console.log('Data Destroyed!');

    await Book.insertMany(books);
    console.log('Data Imported!');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();
