const fs = require('fs');
require('dotenv').config();

function readArticleFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('dane.txt', 'utf-8', (err, data) => {
      if (err) reject('Błąd podczas wczytywania pliku: ' + err);
      else resolve(data);
    });
  });
}

async function processArticleWithOpenAI(articleContent) {
  const prompt = `
        Przekształć poniższy artykuł na format HTML (Twoja odpowiedz powinna zawierać tylko HTML, żadnego "Oczywiście oto przykładowy artykuł itp.").
        Kod artykułu powinien spełniać następujące wytyczne:
        • Użycie odpowiednich tagów HTML do strukturyzacji treści.
        tagu <img> z atrybutem src="image_placeholder.jpg". Dodaj atrybut alt do
        każdego obrazka z dokładnym promptem, który możemy użyć do wygenerowania grafiki
        oraz dodaj podpisy pod grafikami w tagach <figcaption>.
        • Brak kodu CSS ani JavaScript. Zwrócony kod powinien zawierać wyłącznie zawartość do
        wstawienia pomiędzy tagami <body> i </body>. Nie dołączaj znaczników <html>,
        <head> ani <body>
        . Oto artykuł:
        
        ${articleContent}
    `;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a professional HTML assistant. Your task is to convert an article into clean HTML code. The output should include:
          - Use appropriate HTML tags for headings, paragraphs, and images.
          - Include the <img> tag with src="image_placeholder.jpg" and alt text with a detailed prompt for the image.
          - Add captions using <figcaption>.
          - The output should be clean, without any additional explanations or comments.
          - Do not include CSS or JavaScript code.`,
        },

        { role: 'user', content: prompt },
      ],
      max_tokens: 2000,
      temperature: 0.5,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Szczegóły błędu:', errorText);
    throw new Error('Błąd API OpenAI: ' + response.statusText);
  }

  const jsonResponse = await response.json();
  if (
    jsonResponse &&
    jsonResponse.choices &&
    jsonResponse.choices[0] &&
    jsonResponse.choices[0].message &&
    jsonResponse.choices[0].message.content
  ) {
    return jsonResponse.choices[0].message.content.trim();
  } else {
    throw new Error(
      'Błąd: Odpowiedź API nie zawiera oczekiwanego pola "choices[0].message.content".'
    );
  }
}

function saveHtmlToFile(htmlContent) {
  fs.writeFile('artykul.html', htmlContent, (err) => {
    if (err) console.error('Błąd podczas zapisywania pliku: ', err);
    else console.log('Plik artykul.html zapisany pomyślnie!');
  });
}

async function main() {
  try {
    const articleContent = await readArticleFile();
    const htmlContent = await processArticleWithOpenAI(articleContent);
    saveHtmlToFile(htmlContent);
  } catch (error) {
    console.error('Błąd aplikacji:', error);
  }
}

main();
