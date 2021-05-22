interface NFT {
    id?: string
    name: string,
    description: string,
    image?: string,
    creator: string
    soldfor?: number
    askingprice?: number
  }

export default NFT;