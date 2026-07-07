export default function ScoreCard({ overallScore, atsScore }) {
    return (
        <div className="grid gap-6 md:grid-cols-2 mt-8">

            <div className="rounded-2xl bg-white p-6 shadow border">
                <p className="text-slate-500 text-sm">
                    Overall Score
                </p>

                <h2 className="text-5xl font-bold mt-3 text-indigo-600">
                    {overallScore}
                </h2>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow border">
                <p className="text-slate-500 text-sm">
                    ATS Score
                </p>

                <h2 className="text-5xl font-bold mt-3 text-green-600">
                    {atsScore}
                </h2>
            </div>

        </div>
    );
}