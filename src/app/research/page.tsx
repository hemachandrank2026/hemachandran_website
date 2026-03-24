import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Publication from '@/models/Publication';
import Patent from '@/models/Patent';
import ResearchTabs from '@/components/ResearchTabs';

async function getData() {
  try {
    await dbConnect();
    const pubs = await Publication.find({}).sort({ createdAt: -1 }).lean();
    const pats = await Patent.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return {
      publications: JSON.parse(JSON.stringify(pubs)),
      patents: JSON.parse(JSON.stringify(pats)),
    };
  } catch {
    return { publications: [], patents: [] };
  }
}

export default async function ResearchPage() {
  const { publications, patents } = await getData();

  return (
    <>
      <div className="page-banner">
        <h1>Research <span className="accent-text">Gallery</span></h1>
        <p className="breadcrumb"><Link href="/">Home</Link> / Research</p>
      </div>

      <section className="section">
        <div className="container">
          <ResearchTabs publications={publications} patents={patents} />
        </div>
      </section>
    </>
  );
}
