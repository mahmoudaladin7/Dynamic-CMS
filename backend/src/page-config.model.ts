import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

// Enum for form field types
export enum FieldType {
  TEXT = "text",
  NUMBER = "number",
  EMAIL = "email",
  DATE = "date",
  SELECT = "select",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  DROPDOWN = "dropdown",
  SWITCHER = "switcher",
  RADIO = "radio",
}

export interface FormField {
  type: FieldType;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[]; // For dropdown, radio, and select
  defaultValue?: boolean; // For switcher
}

@Entity()
export class PageConfig {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true }) // Ensuring pageId is unique
  pageId!: string;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "text" }) // Using text type for large content
  content!: string;

  @Column({ type: "jsonb", nullable: true })
  formFields!: FormField[];
}
