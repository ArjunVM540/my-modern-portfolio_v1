export const resumeData = {
  name: "Arjun V M",
  initials: "AVM",
  title: "Cloud & DevOps Engineer",
  headline: "Building Scalable Modern Infrastructure",
  email: "heyarjunvm@gmail.com",
  phone: "+91 9946899080",
  location: "Kochi, Kerala, India",
  linkedin: "https://www.linkedin.com/in/arjun-vm/",
  github: "https://github.com/ArjunVM540",
  summary:
    "Passionate Software Engineer specializing in Cloud Engineering and DevOps with expertise in building scalable CI/CD pipelines, containerized applications, and infrastructure automation. Currently at EY, implementing DevOps practices, Kubernetes deployments, and cloud infrastructure management.",
  education: {
    institution: "Cochin University of Science and Technology",
    degree: "B. Tech Computer Science and Engineering",
    duration: "2020 - 2024",
    gpa: "8.64 / 10.00",
  },
  experience: [
    {
      title: "Software Engineer",
      company: "EY",
      location: "Kochi, Kerala",
      duration: "July 2024 — Present",
      highlights: [
        "Engineered CI/CD pipelines to automate build, test, and deployment workflows",
        "Provisioned and configured infrastructure using Ansible",
        "Deployed containerized applications on Kubernetes",
        "Integrated DevOps practices across development teams",
        "Monitored and optimized deployment workflows",
      ],
    },
    {
      title: "Web Development Intern",
      company: "Futura Labs",
      location: "Kochi, Kerala",
      duration: "May 2023 — June 2023",
      highlights: [
        "Built full-stack web applications using MERN stack",
        "Developed REST APIs and integrated frontend with backend services",
        "Improved UI responsiveness and application performance",
      ],
    },
  ],
  skills: [
    { name: "Azure", category: "Cloud" },
    { name: "Docker", category: "DevOps" },
    { name: "Kubernetes", category: "DevOps" },
    { name: "Terraform", category: "IaC" },
    { name: "GitHub Actions", category: "CI/CD" },
    { name: "Linux", category: "Systems" },
    { name: "CI/CD", category: "DevOps" },
    { name: "Snowflake", category: "Data" },
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Languages" },
  ],
  certifications: [
    {
      name: "SRE Practitioner v1.2",
      issuer: "DevOps Institute",
      year: "2025",
    },
    {
      name: "Azure Fundamentals (AZ-900)",
      issuer: "Microsoft",
      year: "2024",
    },
  ],
  projects: [
    {
      name: "DeployFlow",
      category: "Cloud & DevOps",
      tech: ["GitHub Actions", "Docker", "Kubernetes", "Azure"],
      description:
        "Fully automated CI/CD pipeline from code commit to production deployment. Docker-based containerization with Kubernetes orchestration for scalable, zero-downtime deployments.",
      details: {
        challenge: "Manual deployments were error-prone, slow, and caused frequent production incidents during releases.",
        solution: "Built a fully automated CI/CD pipeline using GitHub Actions that triggers on every push. Docker containers ensure consistent environments, while Kubernetes handles orchestration with rolling updates for zero-downtime deployments.",
        outcome: "Reduced deployment time from 45 minutes to under 5 minutes. Achieved zero-downtime releases and eliminated manual deployment errors.",
        features: [
          "Automated testing and linting on every PR",
          "Docker multi-stage builds for optimized images",
          "Kubernetes rolling updates with health checks",
          "Azure Container Registry for image management",
          "Slack notifications for deployment status",
        ],
      },
      github: "https://github.com/ArjunVM540",
      demo: "#",
    },
    {
      name: "DeepShield",
      category: "Machine Learning",
      tech: ["Python", "TensorFlow", "OpenCV", "CNN"],
      description:
        "End-to-end deep learning pipeline for detecting deepfake videos via frame-level analysis using CNN models for spatial feature extraction and classification.",
      details: {
        challenge: "Rising prevalence of deepfake videos posed a threat to information integrity, requiring reliable automated detection.",
        solution: "Developed a CNN-based pipeline that extracts frames from videos, analyzes spatial features, and classifies content as authentic or manipulated using transfer learning on a curated dataset.",
        outcome: "Achieved 94% detection accuracy on benchmark datasets with real-time processing capability for video streams.",
        features: [
          "Frame-level spatial feature extraction",
          "Transfer learning with pre-trained CNN models",
          "Real-time video stream processing",
          "Confidence scoring for each prediction",
          "Batch processing for large video archives",
        ],
      },
      github: "https://github.com/ArjunVM540",
      demo: "#",
    },
  ],
  stats: [
    { label: "Years Experience", value: "1+" },
    { label: "Projects Deployed", value: "10+" },
    { label: "Certifications", value: "2" },
    { label: "Technologies", value: "15+" },
  ],
};
