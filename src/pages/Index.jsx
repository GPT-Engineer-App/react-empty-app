import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

const Index = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchBreeds = async () => {
      const response = await fetch("https://api.thedogapi.com/v1/breeds?limit=10");
      const data = await response.json();
      setBreeds(data);
    };

    fetchBreeds();
  }, []);

  const fetchBreedDetails = async (breedId) => {
    const response = await fetch(`https://api.thedogapi.com/v1/breeds/${breedId}`);
    const data = await response.json();
    setSelectedBreed(data);
    onOpen();
  };

  return (
    <Box>
      <Heading>Dog Breeds</Heading>
      <SimpleGrid columns={[2, null, 3]} spacing="40px">
        {breeds.map((breed) => (
          <Box key={breed.id} onClick={() => fetchBreedDetails(breed.id)} cursor="pointer">
            <Image src={breed.image.url} alt={breed.name} />
            <Heading size="md">{breed.name}</Heading>
          </Box>
        ))}
      </SimpleGrid>

      {selectedBreed && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedBreed.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={selectedBreed.image.url} alt={selectedBreed.name} />
              <Text mt={4}>
                <strong>Temperament:</strong> {selectedBreed.temperament}
              </Text>
              <Text>
                <strong>Life Span:</strong> {selectedBreed.life_span}
              </Text>
              <Text>
                <strong>Height:</strong> {selectedBreed.height.metric} cm
              </Text>
              <Text>
                <strong>Weight:</strong> {selectedBreed.weight.metric} kg
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Index;
