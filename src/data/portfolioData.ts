export type ProjectCategory =
  | 'all'
  | 'Consumer Products'
  | 'Mechanical Parts'
  | 'Architecture';

export interface StatItem {
  label: string;
  value: number;
  prefix: string;
}

export interface SkillItem {
  name: string;
  level: string;
  iconName: string;
}

export interface WorkflowStage {
  step: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  type: string;
  image: string;
  driveUrl: string;
  description: string;
  tags: string[];
}

export interface EmbeddedResource {
  name: string;
  type: string;
  size: string;
  url: string;
  iconName: string;
}

export type CertificationCategory = 'all' | 'SolidWorks' | 'Others';

export interface CertificationItem {
  id: string;
  order: string;
  shortCode: string;
  title: string;
  issuer: string;
  category: Exclude<CertificationCategory, 'all'>;
  issuedDate: string;
  verificationCode: string;
  pdfUrl: string;
  driveUrl: string;
  downloadFileName: string;
}

export const PORTFOLIO_DATA = {
  personalInfo: {
    name: 'MD MOSHIUR RAHMAN',
    firstName: 'MD MOSHIUR',
    lastName: 'RAHMAN',
    title: 'MECHANICAL DESIGNER',
    subtitle: 'HELLO I’AM',
    heroBio:
      'Mechanical Engineering student passionate about developing practical and innovative engineering solutions. Specialized in 3D Modeling, SolidWorks solid-body modeling, paid 3D printing projects, and product development.',
    aboutParagraph1:
      'I am a Mechanical Engineering student with a strong interest in Mechanical Design, 3D Modeling, and Product Development. I have practical experience in mechanical design and paid 3D-printing projects, creating accurate and functional solid-body models for manufacturing using SolidWorks.',
    aboutHighlightTitle: 'Practical Experience & University Leadership',
    aboutHighlightBody:
      'I have worked as a Mechanical Designer in university clubs and engineered custom models for paid FDM 3D printing clients, focusing on strength, tolerance stack-ups, and assembly fits.',
    aboutParagraph2:
      'I also bring hands-on experience in Prompt Engineering and advanced AI tools to accelerate design iteration, research, and documentation workflows.',
    skillsOverview:
      'I have strong proficiency in SolidWorks, AutoCAD, Mastercam, Adobe Illustrator, and Microsoft Office, along with sound working knowledge of ANSYS. I use these tools for mechanical design, 3D modeling, CAM programming, technical documentation, analysis, and visual communication. I have knowledge about prompt engineering and advance AI tool using experience.',
  },
  contact: {
    email: 'moshiurca12@gmail.com',
    phone: '01851071832',
    whatsappUrl: 'https://wa.me/message/GJ5GIR4I543XN1',
    linkedinUrl: 'https://www.linkedin.com/in/moshiur-rahman-4a4596324/',
    linkedinHandle: 'in/moshiur-rahman-4a4596324/',
    grabcadUrl: 'https://grabcad.com/moshiur.rahman-18',
    grabcadHandle: 'grabcad.com/moshiur.rahman-18',
    masterDriveFolder:
      'https://drive.google.com/drive/folders/1VcsyLXOdBplIR9ceilzA2GuqMGVtWjqS?usp=sharing',
    resumeDriveUrl:
      '/assets/aistudio/MD_MOSHIUR_RAHMAN_CV___3__79ee380a.pdf',
    resumeEmbedUrl:
      '/assets/aistudio/MD_MOSHIUR_RAHMAN_CV___3__79ee380a.pdf',
  },
  grabcadStats: [
    { label: 'GrabCAD Score', value: 293, prefix: '' },
    { label: 'Total Downloads', value: 1708, prefix: '+' },
    { label: '3D CAD Models', value: 8, prefix: '+' },
    { label: 'Profile Views', value: 266, prefix: '+' },
  ] as StatItem[],
  skills: {
    cadModeling: [
      { name: 'SolidWorks', level: 'Expert', iconName: 'box' },
      { name: 'AutoCAD', level: 'Advanced', iconName: 'draft' },
      { name: 'Mastercam', level: 'CAM Programming', iconName: 'layers' },
      { name: '3D Assemblies', level: 'Expert', iconName: 'cog' },
    ] as SkillItem[],
    simulationGraphics: [
      { name: 'ANSYS FEA', level: 'Working Knowledge', iconName: 'cpu' },
      { name: 'Adobe Illustrator', level: 'Advanced', iconName: 'palette' },
      {
        name: 'Keyshot / Photorealistic Rendering',
        level: 'Advanced',
        iconName: 'sparkles',
      },
      {
        name: 'Technical Drawings (GD&T)',
        level: 'Expert',
        iconName: 'ruler',
      },
    ] as SkillItem[],
    manufacturingTech: [
      {
        name: 'FDM 3D Printing',
        level: 'Practical Experience',
        iconName: 'printer',
      },
      {
        name: 'Paid Client Projects',
        level: 'Professional',
        iconName: 'briefcase',
      },
      {
        name: 'Prompt Engineering & AI Tools',
        level: 'Advanced',
        iconName: 'brain',
      },
      {
        name: 'Microsoft Office Suite',
        level: 'Proficient',
        iconName: 'file-text',
      },
    ] as SkillItem[],
  },
  workflowStages: [
    {
      step: '01',
      title: 'Hand Sketching',
      description:
        'Developing design concepts through freehand technical and creative sketches.',
      iconName: 'pencil-ruler',
    },
    {
      step: '02',
      title: '3D CAD Design',
      description:
        'Creating accurate 3D parts, components, assemblies, and mechanical product designs.',
      iconName: 'box',
    },
    {
      step: '03',
      title: '2D Technical Drawing',
      description:
        'Preparing detailed drawings with dimensions, annotations, and manufacturing specifications.',
      iconName: 'draft',
    },
    {
      step: '04',
      title: 'Photorealistic Rendering',
      description:
        'Creating realistic product renders with proper materials, lighting, and visual presentation.',
      iconName: 'camera',
    },
    {
      step: '05',
      title: 'Graphic Design & Presentation',
      description:
        'Technical graphics, design layouts & professional project presentation.',
      iconName: 'layout-grid',
    },
  ] as WorkflowStage[],
  projects: [
    {
      id: 'ear-bards-case',
      title: 'EAR BARDS CASE',
      category: 'Consumer Products',
      type: 'Google Drive Folder',
      image: '/assets/projects/ear-bards-case.jpg',
      driveUrl:
        'https://drive.google.com/drive/folders/1zd1dFWelbuIgjjsa02Jdvcu9g5mYvpHi?usp=sharing',
      description:
        'Custom designed compact protective case for wireless earbuds featuring snap-fit hinge mechanism and dual-tone metallic finish.',
      tags: ['SolidWorks', 'Consumer Electronics', 'Product Design', '3D Printing'],
    },
    {
      id: 'plastic-basket',
      title: 'PLASTIC BASKET',
      category: 'Consumer Products',
      type: 'Google Drive File',
      image: '/assets/projects/plastic-basket.png',
      driveUrl:
        'https://drive.google.com/file/d/1TKKoNkv8bN-c62DXJV7fm3kDbEd5eYQ7/view?usp=sharing',
      description:
        'Injection molding optimized patterned plastic basket with structural ribbing for maximum load distribution.',
      tags: ['SolidWorks', 'Plastic Design', 'Rib Reinforcement', 'Mold Design'],
    },
    {
      id: 'bag-design',
      title: 'CREATIVE BAG DESIGN',
      category: 'Consumer Products',
      type: 'Google Drive Folder',
      image: '/assets/projects/bag.jpg',
      driveUrl:
        'https://drive.google.com/drive/folders/1t3CFB-bCJBcVM7AFBY2PkN167RZAN9kb?usp=sharing',
      description:
        'Ergonomic modern handbag CAD modeling with complex V-shape surface geometry and hard-shell metallic handles.',
      tags: ['Surface Modeling', 'Product CAD', 'Ergonomics'],
    },
    {
      id: 'pen-box',
      title: 'PEN BOX ASSEMBLY',
      category: 'Mechanical Parts',
      type: 'Google Drive File',
      image: '/assets/projects/pen-box.jpg',
      driveUrl:
        'https://drive.google.com/file/d/1T0GVH8A_RgtnVDofo7bHDuN7rSZ3fYE9/view?usp=sharing',
      description:
        'Precision engineered desk stationery box featuring geometric faceted outer surfaces and internal dividers.',
      tags: ['SolidWorks Assembly', 'Stationery', 'Precision Fit'],
    },
    {
      id: 'case-project',
      title: 'PROTECTIVE CASE SYSTEM',
      category: 'Mechanical Parts',
      type: 'Google Drive Folder',
      image: '/assets/projects/case.jpg',
      driveUrl:
        'https://drive.google.com/drive/folders/1zoMSI9Pi_MYPH_DE21uKHm0xDQ9aCFzF?usp=sharing',
      description:
        'Capsule-shaped heavy-duty enclosure case engineered for shock absorption and top handle lock mechanism.',
      tags: ['Enclosure Design', 'Industrial CAD', 'SolidWorks'],
    },
    {
      id: 'pencile-basket',
      title: 'PENCILE BASKET ORGANIZER',
      category: 'Consumer Products',
      type: 'Google Drive Folder',
      image: '/assets/projects/pencile-basket.jpg',
      driveUrl:
        'https://drive.google.com/drive/folders/1VcsyLXOdBplIR9ceilzA2GuqMGVtWjqS?usp=sharing',
      description:
        'Slotted wooden and metallic desk organizer basket designed for technical stationary items.',
      tags: ['Desk Accessories', 'Wooden CAD', 'Manufacturing'],
    },
    {
      id: 'bicycle-model',
      title: 'BICYCLE FRAME & COMPONENTS',
      category: 'Mechanical Parts',
      type: 'Google Drive File',
      image: '/assets/projects/bicycle.jpg',
      driveUrl:
        'https://drive.google.com/file/d/1uVmmFtZansTIAza4Wx_48prD9mXiLyql/view?usp=sharing',
      description:
        'Detailed bicycle CAD mechanical assembly model including gear train, tubular frame geometry, and wheel hubs.',
      tags: ['Kinematic Assembly', 'Tubular Frame', 'Mechanical CAD'],
    },
    {
      id: 'chair-design',
      title: 'ERGONOMIC CHAIR',
      category: 'Consumer Products',
      type: 'Google Drive File',
      image: '/assets/projects/chair.jpg',
      driveUrl:
        'https://drive.google.com/file/d/1643dRKHaTQb0EP5gjxf5iqv5_V8zPN7T/view?usp=sharing',
      description:
        'Modern furniture design combining continuous tubular chrome frame with ergonomic backrest aesthetics.',
      tags: ['Furniture CAD', 'Tubular Frame', 'Rendering'],
    },
    {
      id: 'monitor-design',
      title: 'MONITOR & STAND ASSEMBLY',
      category: 'Consumer Products',
      type: 'Google Drive File',
      image: '/assets/projects/monitor.jpg',
      driveUrl:
        'https://drive.google.com/file/d/1PkgG85unZjiJBy3wk7bhmL8XfbKNq4VB/view?usp=sharing',
      description:
        'Ultra-slim desktop monitor concept with circular metallic swivel base and bezel-less display enclosure.',
      tags: ['Electronics CAD', 'Desktop Accessories', 'SolidWorks'],
    },
    {
      id: 'cutlery-set',
      title: 'SPOON, FORK, KNIFE PLASTIC',
      category: 'Consumer Products',
      type: 'Google Drive File',
      image: '/assets/projects/cutlery-set.jpg',
      driveUrl:
        'https://drive.google.com/file/d/18PP2hYh6wtlJxu54ZfIjUF9Yh4dgnZBm/view?usp=sharing',
      description:
        'Ergonomic color-coded plastic cutlery clip set (Fork clip, Knife clip, Spoon clip) designed for mass production.',
      tags: ['Injection Molding', 'Product Clips', 'Tooling'],
    },
    {
      id: 'botol-design',
      title: 'PLASTIC WATER BOTTLE (BOTOL)',
      category: 'Consumer Products',
      type: 'Google Drive File',
      image: '/assets/projects/botol.jpg',
      driveUrl:
        'https://drive.google.com/file/d/1BZ5h9TOW2ECN4vFSZsH9znRS8qyVHc5f/view?usp=sharing',
      description:
        'Translucent blow-molding plastic water bottle modeling featuring ergonomic grip grooves and threaded neck.',
      tags: ['Thread Design', 'Blow Molding', 'SolidWorks'],
    },
    {
      id: 'duplex-house',
      title: 'DUPLEX HOUSE ARCHITECTURE',
      category: 'Architecture',
      type: 'Google Drive Folder',
      image: '/assets/projects/duplex-house.jpg',
      driveUrl:
        'https://drive.google.com/drive/folders/1VcsyLXOdBplIR9ceilzA2GuqMGVtWjqS?usp=sharing',
      description:
        '3D building layout and structural architectural modeling created for modern residential spatial visualization.',
      tags: ['Revit', 'AutoCAD', 'Architectural CAD'],
    },
    {
      id: 'soundbox-design',
      title: 'SOUNDBOX SPEAKER ENCLOSURE',
      category: 'Consumer Products',
      type: 'Google Drive File',
      image: '/assets/projects/soundbox.jpg',
      driveUrl:
        'https://drive.google.com/file/d/1sHfGmwK81neLVGOdUAemhfPk3hVdLpOI/view?usp=sharing',
      description:
        'Acoustically tuned speaker housing with front metallic mesh grill geometry and dampening mounts.',
      tags: ['Acoustic Housing', 'Enclosure CAD', 'Keyshot Render'],
    },
    {
      id: 'ball-valve',
      title: 'INDUSTRIAL BALL VALVE ASSEMBLY',
      category: 'Mechanical Parts',
      type: 'GrabCAD & Drive Hub',
      image: '/assets/projects/ball-valve.png',
      driveUrl: 'https://grabcad.com/moshiur.rahman-18',
      description:
        'Multi-body mechanical assembly of high-pressure stainless steel ball valve complete with stem, ball, and blue lever handle.',
      tags: ['Industrial Piping', 'Mechanical Assembly', 'SolidWorks'],
    },
    {
      id: 'cup-design',
      title: 'CERAMIC COFFEE CUP',
      category: 'Consumer Products',
      type: 'Google Drive File',
      image: '/assets/projects/cup.png',
      driveUrl:
        'https://drive.google.com/file/d/1jMwr5Dens8Hb4eAJ0NWSn6Ha0DcK5yum/view?usp=sharing',
      description:
        'Clean ceramic mug rendering with accurate wall thickness, handle curvature, and realistic shadows.',
      tags: ['Product Design', 'SolidWorks', 'Rendering'],
    },
    {
      id: 'fan-design',
      title: 'COOLING FAN ASSEMBLY',
      category: 'Mechanical Parts',
      type: 'Google Drive Folder',
      image: '/assets/projects/fan.png',
      driveUrl:
        'https://drive.google.com/drive/folders/1VcsyLXOdBplIR9ceilzA2GuqMGVtWjqS?usp=sharing',
      description:
        '7-blade brushless DC cooling fan CAD assembly with mounting frame, wire leads, and aerodynamic blade profiling.',
      tags: ['Blade Aerodynamics', 'Electronics Cooling', 'SolidWorks'],
    },
    {
      id: 'hand-sketch',
      title: 'LATHE MACHINE HAND SKETCH',
      category: 'Consumer Products',
      type: 'Google Drive Folder',
      image: '/assets/projects/hand-sketch.png',
      driveUrl:
        'https://drive.google.com/drive/folders/1VcsyLXOdBplIR9ceilzA2GuqMGVtWjqS?usp=sharing',
      description:
        'Detailed freehand technical sketch of an industrial Lathe Machine showcasing perspective drafting skills.',
      tags: ['Freehand Technical Sketch', 'Drafting', 'Concept Art'],
    },
  ] as ProjectItem[],
  embeddedResources: [
    {
      name: 'Master Design & Renders Google Drive Folder',
      type: 'Drive Main Folder',
      size: 'All HD Renders',
      url: 'https://drive.google.com/drive/folders/1VcsyLXOdBplIR9ceilzA2GuqMGVtWjqS?usp=sharing',
      iconName: 'folder-shared',
    },
    {
      name: 'Moshiur Rahman Official CV / Resume.pdf',
      type: 'Document PDF',
      size: 'Official CV',
      url: '/assets/aistudio/MD_MOSHIUR_RAHMAN_CV___3__79ee380a.pdf',
      iconName: 'file-pdf',
    },
    {
      name: 'Ear Bards Case 3D CAD Files & STLs',
      type: 'Google Drive Folder',
      size: 'Resource Repo',
      url: 'https://drive.google.com/drive/folders/1zd1dFWelbuIgjjsa02Jdvcu9g5mYvpHi?usp=sharing',
      iconName: 'folder-zip',
    },
    {
      name: 'Plastic Basket SolidWorks Model',
      type: 'CAD Model Document',
      size: 'Drive Link',
      url: 'https://drive.google.com/file/d/1TKKoNkv8bN-c62DXJV7fm3kDbEd5eYQ7/view?usp=sharing',
      iconName: 'box',
    },
    {
      name: 'Creative Bag CAD Folder & Assets',
      type: 'Google Drive Folder',
      size: 'Resource Repo',
      url: 'https://drive.google.com/drive/folders/1t3CFB-bCJBcVM7AFBY2PkN167RZAN9kb?usp=sharing',
      iconName: 'folder-shared',
    },
    {
      name: 'Pen Box Assembly Drawing & Model',
      type: 'CAD Document',
      size: 'Drive Link',
      url: 'https://drive.google.com/file/d/1T0GVH8A_RgtnVDofo7bHDuN7rSZ3fYE9/view?usp=sharing',
      iconName: 'draft',
    },
    {
      name: 'Protective Enclosure Case System',
      type: 'Google Drive Folder',
      size: 'Resource Repo',
      url: 'https://drive.google.com/drive/folders/1zoMSI9Pi_MYPH_DE21uKHm0xDQ9aCFzF?usp=sharing',
      iconName: 'folder-cog',
    },
    {
      name: 'Bicycle Frame SolidWorks Assembly',
      type: 'CAD Model File',
      size: 'Drive Link',
      url: 'https://drive.google.com/file/d/1uVmmFtZansTIAza4Wx_48prD9mXiLyql/view?usp=sharing',
      iconName: 'cog',
    },
    {
      name: 'Ergonomic Chair 3D Model',
      type: 'CAD Model File',
      size: 'Drive Link',
      url: 'https://drive.google.com/file/d/1643dRKHaTQb0EP5gjxf5iqv5_V8zPN7T/view?usp=sharing',
      iconName: 'file-3d',
    },
    {
      name: 'Monitor Desktop Stand CAD',
      type: 'CAD Model File',
      size: 'Drive Link',
      url: 'https://drive.google.com/file/d/1PkgG85unZjiJBy3wk7bhmL8XfbKNq4VB/view?usp=sharing',
      iconName: 'monitor',
    },
    {
      name: 'Plastic Cutlery Set Manufacturing Drawing',
      type: 'CAD Drawing',
      size: 'Drive Link',
      url: 'https://drive.google.com/file/d/18PP2hYh6wtlJxu54ZfIjUF9Yh4dgnZBm/view?usp=sharing',
      iconName: 'file-list',
    },
    {
      name: 'Plastic Water Bottle (Botol) STEP/SLDPRT',
      type: 'CAD Model File',
      size: 'Drive Link',
      url: 'https://drive.google.com/file/d/1BZ5h9TOW2ECN4vFSZsH9znRS8qyVHc5f/view?usp=sharing',
      iconName: 'droplet',
    },
    {
      name: 'Soundbox Speaker Housing',
      type: 'CAD Model File',
      size: 'Drive Link',
      url: 'https://drive.google.com/file/d/1sHfGmwK81neLVGOdUAemhfPk3hVdLpOI/view?usp=sharing',
      iconName: 'volume',
    },
    {
      name: 'Coffee Cup Insulated Model',
      type: 'CAD Model File',
      size: 'Drive Link',
      url: 'https://drive.google.com/file/d/1jMwr5Dens8Hb4eAJ0NWSn6Ha0DcK5yum/view?usp=sharing',
      iconName: 'cup',
    },
    {
      name: 'Moshiur Rahman GrabCAD Profile Portfolio',
      type: 'GrabCAD Hub',
      size: 'External Link',
      url: 'https://grabcad.com/moshiur.rahman-18',
      iconName: 'globe',
    },
  ] as EmbeddedResource[],
  resumeDetails: {
    header: {
      name: 'MD MOSHIUR RAHMAN',
      role: 'Mechanical Engineer',
      phone: '01851071832',
      email: 'engr.moshiur.me@gmail.com',
      linkedin: 'https://www.linkedin.com/in/moshiur-rahman-me',
      linkedinLabel: 'linkedin.com/in/moshiur-rahman-me',
      location: 'Rayarbag, Jatrabari, Dhaka, Bangladesh',
      grabcad: 'https://grabcad.com/moshiur.rahman-18',
    },
    objective:
      'Seeking a challenging opportunity as a Mechanical Engineer where I can apply my expertise in mechanical design, CAD modeling, SolidWorks, CAM programming, and 3D printing. With practical project experience and professional SolidWorks certifications, I aim to contribute to innovative engineering solutions, enhance manufacturing processes, and continuously develop my technical skills while adding value to the organization.',
    experience: [
      {
        company: 'The Trade of Engineers',
        role: 'Mechanical Designer',
        period: 'January 2026 – Present',
        points: [
          'Designed mechanical parts based on client requirements using CAD software.',
          'Developed 3D printable part designs.',
          'Mechanical design work on a project-by-project basis.',
        ],
      },
      {
        company: 'Urban Fabco',
        role: 'Founder',
        period: 'January 2025 – April 2026',
        points: [
          'Maintained and organized business operations.',
          'Constantly updated the company’s contact and mailing lists.',
          'Monitored ongoing marketing campaigns.',
        ],
      },
    ],
    education: [
      {
        degree: 'Bachelor in Mechanical Engineering',
        institution:
          'International University of Business Agriculture and Technology (IUBAT)',
        period: '2023 – December 2026',
        grade: 'CGPA 3.36',
      },
      {
        degree: 'Diploma in Mechanical Technology',
        institution: 'Kushtia Polytechnic Institute',
        period: 'July 2017 – January 2022',
        grade: 'CGPA 3.85',
      },
      {
        degree: 'Secondary School Certificate (SSC)',
        institution: 'Sirajulhoque Muslima High School, Kushtia',
        period: '2013 – 2017',
        grade: 'GPA 4.87',
      },
    ],
    certifications: [
      {
        title: 'Certified SOLIDWORKS Professional (CSWP)',
        code: 'C-EHYU2WAGKL',
      },
      {
        title: 'Certified SOLIDWORKS Associate (CSWA)',
        code: 'C-7DZNWYXLHS',
      },
      {
        title: 'SOLIDWORKS xDesign Associate',
        code: 'C-PY39XQFMS5',
      },
      {
        title: 'SOLIDWORKS xShape Associate',
        code: 'C-5UPCVKTABW',
      },
      {
        title: 'SOLIDWORKS xMold Associate',
        code: 'C-L4DBWJCY8R',
      },
    ],
    softwareSkills: [
      'SolidWorks',
      'AutoCAD',
      'Mastercam',
      'Adobe Illustrator',
      'Microsoft Office (Word, Excel, PowerPoint)',
    ],
    coreSkills: [
      'Mechanical Design - CAD Modeling & Drafting',
      '3D Printing Part Design',
      'Engineering Drawing & Hand Sketching',
      'AI Prompt Engineering',
      'CAM Programming',
      '3-Axis Milling Machine Operation',
      'Graphic Design',
      'Teamwork & Collaboration - Leadership',
    ],
    extracurricular: [
      'IIEC (IUBAT Innovation and Entrepreneurship Center) – Mechanical Designer',
      'RIM Repper Club IUBAT – Mechanical Designer',
      'Bangladesh Red Crescent Society – Volunteer (College Level)',
    ],
    awards: [
      '100% tuition fee scholarship at International University of Business Agriculture and Technology (IUBAT).',
      'Academic Excellence Award from Kushtia Polytechnic Institute for maintaining SGPA 4.0 for three consecutive semesters.',
    ],
    languages: [
      { name: 'Bangla', level: 'Native' },
      { name: 'English', level: 'Intermediate' },
      { name: 'Japanese', level: 'Beginner' },
    ],
  },
  certifications: [
    {
      id: 'cswp',
      order: '01',
      shortCode: 'CSWP',
      title: 'SOLIDWORKS Design Professional (CSWP)',
      issuer: 'Dassault Systèmes · SOLIDWORKS',
      category: 'SolidWorks',
      issuedDate: 'August 22, 2026',
      verificationCode: 'C-EHYU2WAGKL',
      pdfUrl: '/assets/aistudio/CSWP_e2149d14.pdf',
      driveUrl:
        'https://drive.google.com/drive/folders/1VcsyLXOdBplIR9ceilzA2GuqMGVtWjqS?usp=sharing',
      downloadFileName: 'MD_MOSHIUR_RAHMAN_CSWP_Certificate.pdf',
    },
    {
      id: 'cswa',
      order: '02',
      shortCode: 'CSWA',
      title: 'SOLIDWORKS Design Associate (CSWA)',
      issuer: 'Dassault Systèmes · SOLIDWORKS',
      category: 'SolidWorks',
      issuedDate: 'September 20, 2026',
      verificationCode: 'C-7DZNWYXLHS',
      pdfUrl: '/assets/aistudio/cswa_b2609df2.pdf',
      driveUrl:
        'https://drive.google.com/drive/folders/1VcsyLXOdBplIR9ceilzA2GuqMGVtWjqS?usp=sharing',
      downloadFileName: 'MD_MOSHIUR_RAHMAN_CSWA_Certificate.pdf',
    },
    {
      id: 'xdesign',
      order: '03',
      shortCode: 'xDesign',
      title: 'SOLIDWORKS xDesign Associate',
      issuer: 'Dassault Systèmes · SOLIDWORKS',
      category: 'SolidWorks',
      issuedDate: 'August 23, 2026',
      verificationCode: 'C-PY39XQFMS5',
      pdfUrl: '/assets/aistudio/xdesign_791e70c9.pdf',
      driveUrl:
        'https://drive.google.com/drive/folders/1VcsyLXOdBplIR9ceilzA2GuqMGVtWjqS?usp=sharing',
      downloadFileName: 'MD_MOSHIUR_RAHMAN_xDesign_Certificate.pdf',
    },
    {
      id: 'xmold',
      order: '04',
      shortCode: 'xMold',
      title: 'SOLIDWORKS xMold Associate',
      issuer: 'Dassault Systèmes · SOLIDWORKS',
      category: 'SolidWorks',
      issuedDate: 'September 20, 2026',
      verificationCode: 'C-L4DBWJCY8R',
      pdfUrl: '/assets/aistudio/xmold_b24290c0.pdf',
      driveUrl:
        'https://drive.google.com/drive/folders/1VcsyLXOdBplIR9ceilzA2GuqMGVtWjqS?usp=sharing',
      downloadFileName: 'MD_MOSHIUR_RAHMAN_xMold_Certificate.pdf',
    },
    {
      id: 'xshape',
      order: '05',
      shortCode: 'xShape',
      title: 'SOLIDWORKS xShape Associate',
      issuer: 'Dassault Systèmes · SOLIDWORKS',
      category: 'SolidWorks',
      issuedDate: 'August 23, 2026',
      verificationCode: 'C-5UPCVKTABW',
      pdfUrl: '/assets/aistudio/xshape_7cf6ab52.pdf',
      driveUrl:
        'https://drive.google.com/drive/folders/1VcsyLXOdBplIR9ceilzA2GuqMGVtWjqS?usp=sharing',
      downloadFileName: 'MD_MOSHIUR_RAHMAN_xShape_Certificate.pdf',
    },
  ] as CertificationItem[],
};
