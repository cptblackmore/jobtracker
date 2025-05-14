export const uploadJsonFile = (): Promise<string[]> => {
  return new Promise<string[]>((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json, .json";

    input.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files ? target.files[0] : null;
      if (!file) {
        reject(new Error("Файл не выбран"));
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const parsedResult = JSON.parse(e.target?.result as string);
          resolve(parsedResult);
        } catch (e) {
          if (e instanceof Error) {
            reject(new Error("Ошибка парсинга JSON: " + e.message));
          }
        }
      };
      reader.onerror = function () {
        reject(new Error("Ошибка чтения файла"));
      };
      reader.readAsText(file);
    });

    input.click();
  });
};
