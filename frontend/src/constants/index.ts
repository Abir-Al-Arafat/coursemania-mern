import {
  people01,
  people02,
  people03,
  facebook,
  instagram,
  linkedin,
  twitter,
  airbnb,
  binance,
  coinbase,
  dropbox,
  send,
  shield,
  star,
} from "../assets";

export interface NavLink {
  id: string;
  title: string;
  endpoint: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  content: string;
}

export interface Feedback {
  id: string;
  content: string;
  name: string;
  title: string;
  img: string;
}

export interface Stat {
  id: string;
  title: string;
  value: string;
}

export interface FooterLink {
  title: string;
  links: {
    name: string;
    link: string;
  }[];
}

export interface SocialMedia {
  id: string;
  icon: string;
  link: string;
}

export interface Client {
  id: string;
  logo: string;
}

export const navLinks: NavLink[] = [
  {
    id: "home",
    title: "Home",
    endpoint: "/",
  },
  {
    id: "courses",
    title: "Courses",
    endpoint: "/courses",
  },
  {
    id: "learningPaths",
    title: "Learning Paths",
    endpoint: "/learningPaths",
  },
  {
    id: "signup",
    title: "Sign up",
    endpoint: "/signup",
  },
  {
    id: "login",
    title: "Log in",
    endpoint: "/login",
  },
];

export const features: Feature[] = [
  {
    id: "feature-1",
    icon: star,
    title: "Rewards",
    content:
      "The best credit cards offer some tantalizing combinations of promotions and prizes",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "100% Secured",
    content:
      "We take proactive steps to make sure your information and transactions are secure.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Balance Transfer",
    content:
      "A balance transfer credit card can save you a lot of money in interest charges.",
  },
];

export const feedback: Feedback[] = [
  {
    id: "feedback-1",
    content:
      "To stay at the leading edge of IT innovation, your team needs to regularly reinvent its skillset. With Course Mania, I can give my team the space to learn and take the initiative.",
    name: "Ismaeel Ameen",
    title: "Frontend Developer",
    img: people01,
  },
  {
    id: "feedback-2",
    content:
      "Course Mania has been a great platform to stay competitive in the digital transformation of the workplace.",
    name: "Karen Hunter",
    title: "Backend Developer",
    img: people02,
  },
  {
    id: "feedback-3",
    content:
      "Learning web development is one of the biggest accomplishments I’ve made in my education, and it was a key stepping stone to my new career.",
    name: "Adrienne",
    title: "Web Developer",
    img: people03,
  },
];

export const stats: Stat[] = [
  {
    id: "stats-1",
    title: "User Active",
    value: "3800+",
  },
  {
    id: "stats-2",
    title: "Trusted by Company",
    value: "230+",
  },
  {
    id: "stats-3",
    title: "Transaction",
    value: "$230M+",
  },
];

export const footerLinks: FooterLink[] = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Content",
        link: "https://www.hoobank.com/content/",
      },
      {
        name: "How it Works",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "Create",
        link: "https://www.hoobank.com/create/",
      },
      {
        name: "Explore",
        link: "https://www.hoobank.com/explore/",
      },
      {
        name: "Terms & Services",
        link: "https://www.hoobank.com/terms-and-services/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "Partners",
        link: "https://www.hoobank.com/partners/",
      },
      {
        name: "Suggestions",
        link: "https://www.hoobank.com/suggestions/",
      },
      {
        name: "Blog",
        link: "https://www.hoobank.com/blog/",
      },
      {
        name: "Newsletters",
        link: "https://www.hoobank.com/newsletters/",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        name: "Our Partner",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        name: "Become a Partner",
        link: "https://www.hoobank.com/become-a-partner/",
      },
    ],
  },
];

export const socialMedia: SocialMedia[] = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const clients: Client[] = [
  {
    id: "client-1",
    logo: airbnb,
  },
  {
    id: "client-2",
    logo: binance,
  },
  {
    id: "client-3",
    logo: coinbase,
  },
  {
    id: "client-4",
    logo: dropbox,
  },
];
