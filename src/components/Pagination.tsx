'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '3rem', flexWrap: 'wrap' }}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="btn"
        style={{
          padding: '8px 16px',
          opacity: currentPage === 1 ? 0.4 : 1,
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          background: 'var(--card-bg)',
          color: '#fff',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.1)',
          transition: 'all 0.2s',
        }}
      >
        &laquo; Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className="btn"
          style={{
            padding: '8px 14px',
            background: p === currentPage ? 'var(--accent)' : 'var(--card-bg)',
            color: p === currentPage ? '#000' : '#fff',
            borderRadius: '8px',
            fontWeight: p === currentPage ? 700 : 400,
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {p}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="btn"
        style={{
          padding: '8px 16px',
          opacity: currentPage === totalPages ? 0.4 : 1,
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          background: 'var(--card-bg)',
          color: '#fff',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.1)',
          transition: 'all 0.2s',
        }}
      >
        Next &raquo;
      </button>
    </div>
  );
}
