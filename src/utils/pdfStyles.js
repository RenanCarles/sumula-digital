/* Estilos inline para o PDF - cores RGB fixas */
export const pdfStyles = {
  // Backgrounds
  bgSlate950: '#020617',
  bgSlate900: '#0f172a',
  bgSlate800: '#1e293b',
  
  // Text colors
  textSlate50: '#f8fafc',
  textSlate100: '#f1f5f9',
  textSlate200: '#e2e8f0',
  textSlate300: '#cbd5e1',
  textSlate400: '#94a3b8',
  textSlate500: '#64748b',
  textSlate600: '#475569',
  textSlate700: '#334155',
  textSlate800: '#1e293b',
  
  // Borders
  borderSlate700: '#334155',
  borderSlate800: '#1e293b',
  
  // Accent colors
  textEmerald200: '#a7f3d0',
  textEmerald300: '#6ee7b7',
  textEmerald400: '#34d399',
  bgEmerald500: '#10b981',
  borderEmerald600: '#059669',
  
  textAmber400: '#fbbf24',
}

export const getInlineStyles = () => ({
  container: {
    width: '100%',
    maxWidth: '1024px',
    margin: '0 auto',
    backgroundColor: pdfStyles.bgSlate950,
    color: pdfStyles.textSlate100,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  
  section: {
    width: '100%',
    backgroundColor: pdfStyles.bgSlate950,
    color: pdfStyles.textSlate100,
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
  },
  
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${pdfStyles.borderSlate800}`,
    paddingBottom: '1.5rem',
    marginBottom: '2rem',
  },
  
  headerTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '-0.025em',
  },
  
  headerDate: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: pdfStyles.textSlate400,
  },
  
  separator: {
    height: '1.25rem',
    width: '1px',
    backgroundColor: pdfStyles.borderSlate700,
    display: 'inline-block',
    margin: '0 0.5rem',
  },
  
  card: {
    border: `1px solid ${pdfStyles.borderSlate800}`,
    borderRadius: '0.75rem',
    padding: '1.25rem',
    marginBottom: '2rem',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
  },
  
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
  },
  
  sectionTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '-0.025em',
    color: pdfStyles.textSlate100,
    marginBottom: '0.75rem',
  },
  
  label: {
    fontSize: '0.75rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '-0.025em',
    color: pdfStyles.textSlate500,
  },
  
  value: {
    fontSize: '1rem',
    fontWeight: '500',
    color: pdfStyles.textSlate100,
  },
  
  scoreDisplay: {
    fontSize: '1.875rem',
    fontWeight: '600',
    letterSpacing: '-0.025em',
    color: pdfStyles.textSlate50,
  },
  
  winnerBadge: {
    marginTop: '1rem',
    border: `1px solid rgba(5, 150, 105, 0.6)`,
    borderRadius: '0.5rem',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: '0.5rem 0.75rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  
  winnerText: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: pdfStyles.textEmerald300,
  },
  
  logItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    padding: '0.5rem 1rem',
    borderBottom: `1px solid ${pdfStyles.borderSlate800}`,
  },
  
  logTime: {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: pdfStyles.textSlate500,
    marginTop: '0.125rem',
  },
  
  logText: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: pdfStyles.textSlate100,
  },
  
  footer: {
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: `1px solid ${pdfStyles.borderSlate800}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  
  signatureLine: {
    height: '1px',
    backgroundColor: pdfStyles.borderSlate700,
  },
  
  signatureLabel: {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: pdfStyles.textSlate400,
  },
})
