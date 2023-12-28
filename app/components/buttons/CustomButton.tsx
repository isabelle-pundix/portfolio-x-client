import React from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { useRouter } from "next/navigation";

interface Props {
  link: string;
  icon?: React.ReactElement<SvgIconProps>;
  text: string | null;
  external: boolean;
  children?: React.ReactNode;
}

const CustomButton: React.FC<Props> = ({
  link,
  icon,
  text,
  external,
  children,
}) => {
  const theme = useTheme();
  const router = useRouter();

  const handleLink = (url: string) => {
    if (external) {
      window.open(url, "_blank");
    } else {
      router.push(url);
    }
  };

  return (
    <Button
      component="a"
      color="primary"
      size="small"
      variant="text"
      onClick={() => handleLink(link)}
      sx={{
        color: theme.palette.primary.contrastText,
        fontSize: theme.typography.subtitle1,
        fontWeight: "400",
        mr: 2,
        "&:hover": {
          color: theme.palette.primary.main,
        },
        "& svg": {
          mr: 0.5,
        },
      }}
    >
      {icon}
      {text}
    </Button>
  );
};

export default CustomButton;
