
export interface Experience{
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education{
  degree: string;
  school: string;
  year: string;
  description: string;
}

export interface Resume{
  name: string;
  location: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[]
}

export interface handleChangeProps{
  field: "name" | "location" | "summary"
  value:string
}

export interface handleSectionChangeProps{
  section: "experience" | "education",
  index: number,
  key: keyof Experience | keyof Education,
  value:string
}