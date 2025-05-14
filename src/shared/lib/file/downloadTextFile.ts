export const downloadTextFile = (text: string, fileName: string) => {
  const file = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
