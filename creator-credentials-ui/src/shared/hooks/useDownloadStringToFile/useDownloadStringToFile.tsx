type DownloadHandlerProps = {
  content: string;
  mimeType: string;
  fileName: string;
};

type UseDownloadStringToFileReturnType = {
  downloadFile: (props: DownloadHandlerProps) => void;
};

export const useDownloadStringToFile =
  (): UseDownloadStringToFileReturnType => {
    const downloadFile = ({
      content,
      fileName,
      mimeType,
    }: DownloadHandlerProps) => {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = fileName;

      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      URL.revokeObjectURL(url);
    };

    return { downloadFile };
  };
