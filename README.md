# Pepawok - PFD Digitization Application

## About the App

The **PFD Digitization Application** is a custom web application built to simplify the creation and submission of Project Formulation Documents (PFDs) for new projects in Papua New Guinea. Developed for agencies and persons responsible for compiling and submitting PFD's to the Department of National Planning and Monitoring. The primary purpose is to simplify the traditionally complex PFD process through:

- A step-by-step wizard interface  
- Automated calculations  
- Secure file uploads  
- PDF and Word document generation  

This tool ensures compliance with national policies, enhances data accuracy and improves the overall user experience for government stakeholders at national, provincial, and district levels.

---

## Tech Stack

**Backend**  
- PostgreSQL (hosted on [Neon](https://neon.tech))  
- Prisma ORM  
- Next.js API routes  
- BetterAuth for authentication  

**Frontend**  
- Next.js (React with TypeScript)  
- Shadcn UI  
- React Hook Form  
- `pdf-lib` and `docxtemplater` for document generation  

**File Storage**  
- AWS S3  

**Hosting**  
- Netlify 

**Testing**  
- Jest  
- Cypress  

**CI/CD**  
- GitHub Actions  

---

## Key Features

- **Step-by-Step Wizard** – Guides users through each PFD section  
- **Dynamic Fields** – Conditional rendering based on user input  
- **Real-Time Validation** – Ensures accurate completion of required fields  
- **Automated Calculations** – Summarizes costs in the financial table  
- **File Uploads** – Secure uploads for PDFs, DOCX with validation  
- **Data Export** – Generate PFDs in PDF and Word formats  
- **Admin Dashboard** – Manage submissions and export reports  
- **Role-Based Access Control** – Roles for Submitter, Reviewer, Admin  
- **Risk Management Plan** – Includes templates for risk analysis  
- **Monitoring & Evaluation Tools** – Supports M&E workflows like quarterly and annual reviews  

---

## Build Process

1. **Planning** – Broke down PFD forms into logical, user-friendly steps  
2. **Design** – Wireframes for wizard and admin panel  
3. **Backend** – Setup PostgreSQL + Prisma, API routes, BetterAuth integration  
4. **Frontend** – Built with Next.js, Shadcn UI, React Hook Form, document exports  
5. **Testing** – Unit, integration, and E2E testing with Jest and Cypress  
6. **Deployment** – CI/CD with GitHub Actions, deployed via Netlify 

---

## Lessons Learned

- **User-Centric Design** – Simplified UX leads to greater adoption  
- **Validation Matters** – Reduces data errors significantly  
- **Scalability** – Serverless infra (Neon + Netlify) allows flexible scaling  
- **Security First** – RBAC and secure file storage are essential  
- **Documentation** – Crucial for future maintenance and team onboarding  

---

## Areas for Improvement

- Offline support for low-connectivity regions  
- Mobile responsiveness  
- Advanced reporting and analytics dashboards  
- Multi-language support (localization)  
- User-defined PFD templates for recurring projects  

---

## Setup Instructions

### Prerequisites

- Node.js v18+  
- npm or yarn  
- PostgreSQL (hosted or local)  
- AWS S3 bucket  
- Netlify account (for deployment)

### Steps

**Clone the Repository**

```bash
git clone https://github.com/glenhayoge/pepawok.git
```

**Install Dependencies**

```bash
npm install
```

**Create a .env.local file**

```bash
cp .env.local.example .env.local
```

**Update the .env.local file with your environment variables**

```bash
NEON_API_KEY=your-neon-api-key
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_S3_BUCKET=your-aws-s3-bucket
```

**Start the Development Server**

```bash
npm run dev
```

**Open the Application in Your Browser**    
http://localhost:3000

---

## Deployment

To deploy the application, follow these steps:

1. Create a new repository on GitHub and clone it to your local machine.
2. Install the necessary dependencies by running `npm install` in the project directory.
3. Create a `.env.local` file and add your environment variables.
4. Run `npm run build` to build the application.
5. Deploy the contents of the `out` directory to your hosting provider.

---

## Contributing

Contributions are welcome! If you find a bug or have a suggestion, please open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

The Pepawok application was developed by [Glen Hayoge](https://glensea.com) as part of an effort to help digitise and automate the PFD process and other monotonous and complex processes in Papua New Guinea. It was built using the Next.js framework and the Shadcn UI design system.

