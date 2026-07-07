export default function SummaryCard({ summary }) {
    return (
        <div className="mt-8 rounded-2xl bg-white p-6 shadow border">

            <h2 className="text-xl font-semibold mb-3">
                Summary
            </h2>

            <p className="text-slate-600 leading-7">
                {summary}
            </p>

        </div>
    );
}