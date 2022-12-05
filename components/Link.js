import NextLink from "next/link";

const Link = (props) => {
  return (
    <NextLink
      {...props}
      style={{ textDecoration: "inherit", color: "inherit" }}
    >
      {props.children}
    </NextLink>
  );
};

export default Link;
