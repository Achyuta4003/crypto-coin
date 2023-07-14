import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import avatarSrc from "../assets/logo2.png";

const Footer = () => {
    return (
        <Box bgColor={'blackAlpha.900'} color={'whiteAlpha.700'} minH={"48"} px={"16"} py={['16', '8']}>
            <Stack h={'full'} alignItems={'center'} direction={['column', 'row']}>
                <VStack w={'full'} alignItems={['center', 'flex-start']} >
                    <Text fontWeight={'bold'} >About Us</Text>
                    <Text>We are the best crypto trading app in India, we provide our guidance at a very resonal price.</Text>

                </VStack>
                <VStack>
                    <Avatar boxSize={'28'} mt={['4', '0']} src={avatarSrc} />
                    <Text>Our Founder</Text>
                </VStack>

            </Stack>
        </Box>
    )
}

export default Footer
