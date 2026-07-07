export default function SkillsCard({
    title,
    skills,
    color = "bg-indigo-100"
}) {

    return (

        <div className="rounded-2xl bg-white p-6 shadow border">

            <h2 className="text-xl font-semibold mb-4">
                {title}
            </h2>

            <div className="flex flex-wrap gap-2">

                {skills.map((skill) => (

                    <span
                        key={skill}
                        className={`${color} rounded-full px-4 py-2 text-sm`}
                    >
                        {skill}
                    </span>

                ))}

            </div>

        </div>

    );
}