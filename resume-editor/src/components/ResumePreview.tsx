import type { Resume } from "../Types";



type Props = {
  resume:Resume
}

const ResumePreview = ({resume}:Props) => {
  return (
    <div className="bg-gray-50 mx-auto p-6 rounded-xl shadow-md w-full md:w-1/2 max-w-[560px]">
      <h1 className="text-3xl font-bold text-indigo-700">{resume.name}</h1>
      <p className="text-sm text-gray-600">{resume.location}</p>

      <section className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800">Summary</h2>
        <p className="text-gray-700">{resume.summary}</p>
      </section>

      <section className='mt-4'>
        <h2 className='text-lg font-semibold text-gray-800'>Experience</h2>
        {resume.experience.map((exp, i) => (
          <div key={i} className='mb-3'>
            <p className='font-semibold'>{exp.role} @ {exp.company}</p>
            <p className='text-sm text-gray-600'>{exp.duration}</p>
            <p className='text-gray-700'>{exp.description}</p>
          </div>
        ))}
      </section>

      <section className='mt-4'>
        <h2 className='text-lg font-semibold text-gray-800'>Education</h2>
        {resume.education.map((edu, i) => (
          <div key={i} className='mb-3'>
            <p className='font-semibold'>{edu.degree} - {edu.school}</p>
            <p className='text-sm text-gray-600'>{edu.year}</p>
            <p className='text-gray-700'>{edu.description}</p>
          </div>
        ))}
      </section>
      
    </div>
  );
}

export default ResumePreview;
