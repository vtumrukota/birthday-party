export const BirthdayError = ({ error }: { error?: Error }): JSX.Element =>
  <div>
    <h3>Sorry, something went wrong!</h3>
    {error?.message && <p>{error.message}</p>}
  </div>