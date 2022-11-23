import { useContext } from "react";
import { NextPage } from "next";

import { Box, Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts/";
import { LangContext } from "../context/lang";

export const Custom404Page: NextPage = () => {
  const { lang: { error404 }} = useContext(LangContext);

  return (
    <ShopLayout
      title={error404.seo.title}
      description={error404.seo.description}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
      >
        <Typography
          variant="h1"
          component="h1"
          fontSize={{ xs: 70, sm: 100, md: 150 }}
        >
          {error404.page_content.title}
        </Typography>
        <Typography
          marginTop={"1rem"}
          display="block"
          variant="body1"
          fontSize={{ xs: 20, sm: 25, md: 30 }}
        >
          {error404.page_content.description}
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404Page;
