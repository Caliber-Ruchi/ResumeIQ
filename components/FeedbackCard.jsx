export default function FeedbackCard({ title, items }) {

    return (

        <div className="rounded-2xl bg-white p-6 shadow border">

            <h2 className="text-xl font-semibold mb-4">
                {title}
            </h2>

            <ul className="space-y-3">

                {items.map((item, index) => (

                    <li
                        key={index}
                        className="text-slate-600"
                    >
                        • {item}
                    </li>

                ))}

            </ul>

        </div>

    );
}