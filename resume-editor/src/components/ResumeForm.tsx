import ResumePreview from './ResumePreview';
import { useResumeStore } from '../store/useResumeStore';

const ResumeForm = () => {

  const  {resume,setField,setSeleceted,addEntry,removeIfEmpty,enhanceSummary,enhanceDescription,saveResume,downloadJSON,uploadFile } = useResumeStore();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file)
    }
  }

  return (
    <div className='flex lg:flex-row md:flex-col h-screen overflow-y-auto  scrollbar-hide   gap-4'> 
      <div className='p-6 mx-auto max-w-3xl bg-white shadow-md h-full overflow-y-auto scrollbar-hide rounded-xl space-x-4'>

        <input type="file" accept='.pdf,.docx' onChange={handleFileUpload} placeholder='Choose file' className='mb-4 rounded border bg-amber-500 text-center flex justify-center items-center text-white pl-14 justify-self-center cursor-pointer ' />

        <h2 className='text-2xl font-bold mb-4'>Resume Editor</h2>

        <input className='w-full mb-2 p-2 border rounded'
          value={resume.name}
          onChange={(e) => setField("name", e.target.value)}
          placeholder='Name'
        />
        <input className='w-full p-2 border rounded'
          value={resume.location}
          onChange={(e) => setField("location",e.target.value)}
          placeholder='Location'
        />

        <section>
          <h3 className='font-semibold mt-4'>Summary</h3>
          <textarea className='w-full p-2 border rounded'
            value={resume.summary}
            onChange={(e) => setField("summary",e.target.value )}
          />
          <button className='bg-gradient-to-tr from-indigo-500 cursor-pointer via-purple-500 to-pink-500 text-white px-3 py-1 mt-2 rounded'
          onClick={enhanceSummary}
          >Enhance with AI</button>
        </section>

        <section>
          <h3 className='font-semibold mt-4'>
            Experience
          </h3>
          {resume.experience.map((exp, i) => (
            <div key={i} className='bordern p-2 mb-2 rounded'>
              <input
                className='w-full p-1 border rounded'
                value={exp.role}
                onChange={(e) => setSeleceted('experience',i,'role',e.target.value)}
                placeholder='Role'
                onBlur={() => removeIfEmpty("experience", i)}
              />
              <input
                className='w-full p-1 border rounded mt-1'
                value={exp.company}
                onChange={(e) => setSeleceted('experience', i, 'company', e.target.value)}
                placeholder='Company'
                onBlur={() => removeIfEmpty("experience", i)}
              />
              <input
                className='w-full p-1 border rounded mt-1'
                value={exp.duration}
                onChange={(e) => setSeleceted('experience', i, 'duration', e.target.value)}
                placeholder='Duration'
                onBlur={() => removeIfEmpty("experience", i)}
              />
              <textarea
                className='w-full p-1 border rounded mt-1'
                value={exp.description}
                onChange={(e) => setSeleceted('experience', i, 'description', e.target.value)}
                placeholder='Description'
                onBlur={() => removeIfEmpty("experience", i)}
              />

              <button
                onClick={()=>enhanceDescription("experience",i)}
                className='bg-gradient-to-tr from-indigo-500 cursor-pointer via-purple-500 to-pink-500 text-white px-3 py-1 mt-2 rounded'>
                Enhance with AI
              </button>

            </div>
          ))}
          <button className='bg-blue-500 text-white px-3 py-1 mt-2 rounded'
            onClick={()=>addEntry('experience')}
          > + Add Experience</button>

        </section>

        <section>
          <h3 className='font-semibold mt-4'>Education</h3>

          {resume.education.map((edu, i) => (
            <div key={i} className='border p-2 mb-2 rounded'>
              <input className='w-full p-1 border rounded'
                value={edu.degree}
                onChange={(e)=>setSeleceted('education',i,'degree',e.target.value)}
                placeholder='Degree'
                onBlur={() => removeIfEmpty("education", i)}
              />

              <input className='w-full p-1 border rounded mt-1'
                value={edu.school}
                onChange={(e) => setSeleceted('education', i, 'school', e.target.value)}
                placeholder='University/School'
                onBlur={() => removeIfEmpty("education", i)}
              />
              <input className='w-full p-1 border rounded mt-1'
                value={edu.year}
                onChange={(e) => setSeleceted('education', i, 'year', e.target.value)}
                placeholder='Year'
                onBlur={() => removeIfEmpty("education", i)}
              />
              <input className='w-full p-1 border rounded mt-1'
                value={edu.description}
                onChange={(e) => setSeleceted('education', i, 'description', e.target.value)}
                placeholder='Description'
                onBlur={() => removeIfEmpty("education", i)}
              />
              <button
                onClick={()=>enhanceDescription('education',i)}
                className='bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white px-3 py-1 mt-2 rounded cursor-pointer'>
                Enhance with AI
              </button>
            </div>
          ))}
          <button className='bg-blue-500 text-white px-3 py-1 mt-2 rounded'
            onClick={()=>addEntry('education')}
          > + Add Education</button>
        </section>

        <div className='flex gap-4 mt-2'>
          <button className='bg-green-600 text-white px-4 py-2 rounded'
            onClick={saveResume}
          >Save Resume</button>

          <button
            className='bg-purple-600 text-white px-4 rounded'
            onClick={downloadJSON}
          >Download JSON</button>
        </div>

      </div>
      <ResumePreview resume={resume} />
   </div>
  );
}

export default ResumeForm;
