import { Box, IconButton } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/router";
import { Lang } from "../../context/lang";


export const ChangeLanguage = () => {

    const { push, pathname } = useRouter();

    const onClick = (locale: Lang) => {
        push(pathname, pathname, {locale})
    }

  return (

    <Box sx={{display: {xs: 'none', md: 'block'}}}>
        <IconButton onClick={() => onClick("es")}>
            <Image src='/img/espana.png' alt='Spain Flag' width={27} height={27}/>
        </IconButton>
        <IconButton onClick={() => onClick("en")}>
            <Image src='/img/usa.png' alt='USA Flag' width={27} height={27}/>
        </IconButton>
    </Box>
  )
}
