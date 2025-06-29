import { create } from "zustand";
import dummyResume from "../utils/dummyResume";
import { enhanceText } from '../utils/enhanceText';
import type { Education, Experience, Resume } from '../Types';


interface ResumeStrore {
  resume: Resume;
  setField: (field: keyof Resume, value: string) => void;
  setSeleceted: (
    section: "experience" | "education",
    index: number,
    key: keyof Experience | keyof Education,
    value: string
  ) => void;
    
  addEntry: (section: "experience" | "education") => void;
  removeIfEmpty: (section: "experience" | "education", index: number) => void;
  enhanceSummary: () => Promise<void>;
  enhanceDescription: (section: 'experience' | 'education', index: number) => Promise<void>;

  downloadJSON: () => void;
  saveResume: () => Promise<void>;
  uploadFile: (file:File) => void;
}

export const useResumeStore = create<ResumeStrore>((set, get) => ({
  resume: dummyResume,
  setField: (field, value) => {
    set((state) => ({
      resume: {
        ...state.resume,
        [field]: value,
      }
    }));
  },
  setSeleceted: (section, index, key, value) => {
    set((state) => {
      const updated = [...state.resume[section]];
      updated[index] = { ...updated[index], [key]: value };
      return {
        resume: {
          ...state.resume,
          [section]: updated,

        }
      }
    })
  },

  addEntry: (section) => {
    const empty = section === 'experience' ? { role: '', company: '', duration: '', description: '' } : { degree: '', school: '', year: '', description: '' };

    set((state) => ({
      resume: {
        ...state.resume,
        [section]: [...state.resume[section], empty],
      },
      
    }));
  },

  removeIfEmpty: (section, index) => {
    const entry = get().resume[section][index];
    const isEmpty = Object.values(entry).every((val) => val.trim?.() === '');
    const isLast = index === get().resume[section].length - 1;

    if (isEmpty && isLast) {
      set((state) => ({
        resume: {
          ...state.resume,
          [section]: state.resume[section].slice(0, 1),
        }
      }));
    }
  },

  enhanceSummary: async () => {
    const summary = get().resume.summary;
    const enhanced = await enhanceText(summary);
    set((state) => ({
      resume: {
        ...state.resume, summary: enhanced,
      }
    }));
  },

  enhanceDescription: async (section, index) => {
    try{
      const description = get().resume[section][index].description;
    if (!description.trim()) return;

    const enhanced = await enhanceText(description);
    const updated = [...get().resume[section]];
    updated[index] = { ...updated[index], description: enhanced }
    

    set((state) => ({
      resume: {
        ...state.resume,
        [section]: updated,
      }
    }));
    }catch (err: unknown) {
      console.error('Error enhacing description:', err);
    }
    },
    

  downloadJSON: () => {
    const data = get().resume;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.json';
    a.click();
    URL.revokeObjectURL(url);
  },

  saveResume: async () => {
    const data = get().resume;
    await fetch('http://localhost:8000/save-resume', {
      method: 'POST',
      headers: { "Content-Type": 'application/json' },
      body:JSON.stringify(data)

    })
    
  },

  uploadFile: (file: File) => {

    console.log("Pretending to parse this file", file.name) /// Currently we are not actually parsing file will just parse the dummy data below
    setTimeout(() => {
      const parsedDummyResume: Resume = {
        name: "Dear manager",
        location: "india",
        summary: "your duty i to hire hirdesh hire him",
        experience: [
          {
            role: 'Mannger',
            company: 'Tech',
            duration: 'forever',
            description:'To the inteview Ghost'
          }
        ],
        education: [
          
          {
            degree: 'MCA',
            school: "Maharashtra Uni",
            year: "2025",
            description:"lorem ispum"
          }
        ],
        skills:['good at hiring','best hire']
      }

      set(() => ({
        resume:parsedDummyResume
      }))
    },1000)
  }

}))