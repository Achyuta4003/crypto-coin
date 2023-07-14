import React, { useEffect, useState } from 'react'
import axios from "axios";
import { server } from "../index";
import { Button, Container, Heading, HStack, Image, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import { Link } from 'react-router-dom';


const Coins = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [coins, setCoins] = useState([]);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState('inr');

    const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const changePage = page => {
        setPage(page)
        setLoading(true)
    }

    const btns = new Array(132).fill(1) //132 page fetch whwn api called

    useEffect(() => {

        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
                setCoins(data);
                setLoading(false)

            } catch (error) {
                setLoading(false);
                setError(true)
            }
        }
        fetchCoins()
    }, [currency, page])




    if (error) return <ErrorComponent message={'Error while fetching Coins'} />


    return (
        <Container maxW={"container.xl"}>
            {loading ? <Loader /> : <>

                <RadioGroup value={currency} onChange={setCurrency} p={'8'} >
                    <HStack spacing={'4'} >
                        <Radio value={"inr"} >INR</Radio>
                        <Radio value={"usd"} >USD</Radio>
                        <Radio value={"eur"} >EUR</Radio>
                    </HStack>
                </RadioGroup>
                <HStack wrap={'wrap'} justifyContent={"space-evenly"} >
                    {
                        coins.map(i => (
                            <CoinCard id={i.id} name={i.name} img={i.image} symbol={i.symbol} price={i.current_price} currencySymbol={currencySymbol} key={i.id} />
                        ))
                    }
                </HStack>

                <HStack w={"full"} overflowX={"auto"} padding={"8"} >
                    {
                        btns.map((item, index) => (
                            <Button bgColor={'blackAlpha.900'} color={"white"} onClick={() => changePage(index + 1)} key={index} >
                                {index + 1}
                            </Button>
                        ))
                    }
                </HStack>
            </>}
        </Container>
    )
}

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => {
    return <Link to={`/coin/${id}`} >

        <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.3s'} m={'4'} css={{ "&:hover": { transform: "scale(1.1)" } }} >

            <Image src={img} alt="Exchange" w={'10'} h={"10"} objectFit={"contain"} />

            <Heading size={'md'} noOfLines={"1"}>{symbol}</Heading>

            <Text noOfLines={'1'} >{name}</Text>
            <Text noOfLines={'1'} >{price ? `${currencySymbol} ${price}` : "NA"}</Text>

        </VStack>
    </Link>
}



export default Coins
