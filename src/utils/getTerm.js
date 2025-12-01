
export function getCurrentTermInfo() {
  const now = new Date();
  const month = now.getMonth() + 1; 
  const year = now.getFullYear();

  let term = "Winter";

  if (month >= 5 && month <= 8) {
    term = "Spring/Summer";
  } else if (month >= 9) {
    term = "Fall";
  }

  const readableDate = now.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return { term, year, readableDate};
}

