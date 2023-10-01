import CircularProgress from "@mui/material/CircularProgress";

export const Loader = ({ content }: { content: JSX.Element | string }) =>
  <div className="flex flex-row items-center justify-center">
    <CircularProgress />
    <h1 className="text-xl ml-5">{content}</h1>
  </div>