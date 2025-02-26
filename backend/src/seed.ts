import { DataSource } from "typeorm";
import { PageConfig } from "./page-config.model";

async function seed() {
  const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "", // Update if needed
    database: "postgres",
    entities: [PageConfig],
    synchronize: true,
  });

  await dataSource.initialize();

  const pageConfigRepository = dataSource.getRepository(PageConfig);

  // Clear previous data to prevent duplicates
  await pageConfigRepository.clear();

  // Insert sample data with email field and fixed notifications issue
  await pageConfigRepository.save([
    {
      pageId: "home",
      title: "Welcome to Our Website",
      content: "This is the home page content.",
      formFields: [
        {
          type: "text",
          label: "Full Name",
          name: "fullName",
          placeholder: "Enter your full name",
          required: true,
        },
        {
          type: "email",
          label: "Email",
          name: "email",
          placeholder: "Enter your email",
          required: true,
        },
        {
          type: "dropdown",
          label: "Country",
          name: "country",
          options: [
            { label: "USA", value: "usa" },
            { label: "Canada", value: "canada" },
            { label: "UK", value: "uk" },
            { label: "Egypt", value: "egypt" },
          ],
          required: true,
        },
        {
          type: "switcher",
          label: "Enable Notifications",
          name: "notifications",
          defaultValue: false,
        },
        {
          type: "radio",
          label: "Gender",
          name: "gender",
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ],
          required: true,
        },
      ],
    },
    {
      pageId: "contact",
      title: "Contact Us",
      content: "Fill out this form to get in touch.",
      formFields: [
        {
          type: "text",
          label: "Your Name",
          name: "yourName",
          placeholder: "Enter your name",
          required: true,
        },
        {
          type: "email",
          label: "Your Email",
          name: "yourEmail",
          placeholder: "Enter your email",
          required: true,
        },
        {
          type: "textarea",
          label: "Message",
          name: "message",
          placeholder: "Type your message here...",
          required: true,
        },
      ],
    },
  ]);

  console.log("Database seeded successfully!");
  await dataSource.destroy();
}

seed().catch((err) => console.error("Error seeding database:", err));
