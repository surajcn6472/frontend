export const Footer = ({children, ...props}) => {
  return (
    <footer {...props}>
      <div className="p-6 md:flex md:items-center md:justify-between lg:px-8">
        <p className="text-center text-sm text-zinc-400 md:order-1 md:mt-0">
          © 2024 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
