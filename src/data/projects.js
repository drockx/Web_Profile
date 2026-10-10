export const projects = {
  animarket: {
    id: 'animarket', category: 'mobile', title: 'AniMarket', label: 'MOBILE APPLICATION / MOBILE DEVELOPER',
    description: 'A livestock marketplace mobile application that enables users to post, browse, and sell livestock in a social marketplace experience.',
    contributions: [
      'Designed and developed the mobile application using React Native, TypeScript, and Firebase.',
      'Implemented real-time messaging and calling for communication between buyers and sellers.',
      'Developed dynamic listings with livestock photos, captions, pricing, and adjustable quantities.',
      'Built create, read, update, and delete functionality so users can manage their own livestock listings.',
      'Integrated profile management for viewing and editing personal information and account details.',
      'Used Firebase for real-time data management, authentication, cloud storage, and push notifications.'
    ],
    tags: ['React Native', 'TypeScript', 'Firebase', 'Real-time communication', 'CRUD', 'Authentication'],
    context: 'AniMarket is a React Native mobile application built with TypeScript and Firebase. The portfolio preview uses the supplied project logo. Public source code and a live demo have not been provided.'
  },
  drmc: {
    id: 'drmc', category: 'web', title: 'DRMC Patient Portal', label: 'WEB APPLICATION / PATIENT PORTAL',
    description: 'A patient portal for Davao Regional Medical Center that brings registration, linked hospital records, and laboratory and radiology availability into one web experience.',
    contributionsHeading: 'Project capabilities',
    contributions: [
      'Patient registration using single-use hospital record codes, email verification, and encrypted ID document uploads.',
      'Patient access to linked hospital records, laboratory availability, and radiology study status.',
      'Staff administration with role-based permissions, two-factor authentication, and audit history.',
      'Management of patient records, clinical encounters, doctor listings, and hospital advisories.',
      'CSV and Excel imports with patient reconciliation, validation, and a review step before approval.'
    ],
    tags: ['C#', 'ASP.NET Core', 'SQL Server', 'Entity Framework Core', 'Bootstrap'],
    repositoryUrl: 'https://github.com/DAJabonite/drmc-patient-portal',
    context: 'Development project for Davao Regional Medical Center. Features and technology are documented in the source repository. Production use and hospital system integrations require institutional approval.'
  }
};
