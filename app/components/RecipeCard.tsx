import type { MantineShadow } from "@mantine/core";
import {
  Badge,
  Card,
  Container,
  Image,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { Link } from "@remix-run/react";
import { useState } from "react";
import type { Item } from "../types/recipes";

type Props = {
  recipe: Item | undefined;
  handler?: () => void;
  setSelectedRecipe?: (recipe: Item) => void;
};

export const RecipeCard = ({ recipe, handler }: Props) => {
  const [shadow, setShadow] = useState<MantineShadow>("sm");

  if (!recipe) {
    return (
      <Container>
        <LoadingOverlay visible />
      </Container>
    );
  }

  const onMouseEnterHandler = () => {
    setShadow("md");
  };

  const onMouseLeaveHandler = () => {
    setShadow("sm");
  };

  return (
    <Card
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      shadow={shadow}
    >
      <Card.Section
        onClick={handler}
        sx={{
          width: 456.25,
          height: 258.5,
          marginBottom: 5,
          cursor: "pointer",
        }}
      >
        <Image
          alt={recipe?.name}
          src={`https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_340,q_auto,w_600/hellofresh_s3${recipe?.imagePath}`}
        />
      </Card.Section>

      <Link to={`/recipe/${recipe?.slug}`}>
        <Text weight="bold">{recipe?.name}</Text>
      </Link>

      {recipe?.tags?.length > 0 &&
        recipe?.tags?.map((tag) => (
          <Badge key={`${recipe?.id}-${tag?.id}-${Math.random()}`} size="xs">
            {tag.name}
          </Badge>
        ))}
    </Card>
  );
};
