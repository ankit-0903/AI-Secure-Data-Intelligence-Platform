export interface AnalysisRequest {
  input_type: string;
  content: string;
  options: {
    mask: boolean;
    block_high_risk: boolean;
    log_analysis: boolean;
  };
}

export async function analyzeContent(request: AnalysisRequest) {
  const response = await fetch('http://localhost:8005/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Analysis failed');
  }

  return response.json();
}
