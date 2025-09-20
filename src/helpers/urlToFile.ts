import { imgUrl } from "@/config/config";

export async function urlToAntdFile(url: string, filename: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const file = new File([blob], filename, { type: blob.type });

  return {
    uid: Math.random().toString(36).substring(2), // unique identifier
    name: filename,
    status: "done",
    url,                // preview link
    originFileObj: file // actual file
  };
}

export async function multipleUrlToAntdFile(urls: string[]) {
    if (!urls || urls.length === 0) return [];

    
    const filePromises = urls.map((url, index) => {
      const filename = `file${index + 1}.jpg`;
      return urlToAntdFile(`${imgUrl}${url}`, filename);
    });
  
    const files = await Promise.all(filePromises);
  
    return files;
}

