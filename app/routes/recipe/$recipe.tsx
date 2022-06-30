import {
  Card,
  Container,
  Divider,
  Group,
  Image,
  List,
  Loader,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Fragment } from "react";
import { hellofreshSearchBySlug } from "~/api/hellofresh";
import { IngredientCard } from "~/components/IngredientsCard";
import { HF_ICON_IMAGE_URL, HF_STEP_IMAGE_URL } from "~/constants";
import type { Item } from "~/types/recipes";

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.recipe;

  if (!slug) {
    return await Promise.reject(new Error("Missing recipe slug"));
  }
  const recipes = await hellofreshSearchBySlug({ slug });
  const recipe = recipes?.items[0];
  return json(recipe);
};

const Recipe = () => {
  const matches = useMediaQuery("(min-width: 900px)", true);
  const recipe = useLoaderData<Item>();

  return (
    <>
      {/* <Affix position={{ bottom: 20, left: 20 }}>
        <Button
          leftIcon={<ArrowLeftIcon width={12} />}
          onClick={() => router.back()}
        >
          Go back
        </Button>
      </Affix> */}

      {recipe?.imagePath ? (
        <Image
          alt={recipe?.name}
          height={matches ? 700 : 350}
          src={`https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_500,q_auto,w_2400/hellofresh_s3${recipe?.imagePath}`}
          width={matches ? 2500 : 600}
        />
      ) : (
        <Loader />
      )}

      <Container size="lg">
        <Card mt="md" mb="lg" p="lg" shadow="sm">
          <Card.Section p={20}>
            <Group position="apart">
              <Group direction="column" grow={false} spacing={0}>
                <Title order={1}>{recipe?.name}</Title>
                <Title order={6}> {recipe?.headline} </Title>
              </Group>
              {/* <Group position={matches ? "right" : "center"}>
                {recipe?.cardLink && (
                  <Link to={recipe?.cardLink} target="_blank">
                    <Button leftIcon={<DocumentIcon width={16} />}>
                      Print the Recipe Card
                    </Button>
                  </Link>
                )}
              </Group> */}
            </Group>
            <Divider my="sm" />
            <Group position="apart">
              <Group direction="column">
                <Text sx={{ maxWidth: "750px" }}>{recipe?.description}</Text>
                {recipe && recipe?.tags.length > 0 ? (
                  <Group>
                    <Text weight="bolder">Tags:</Text>
                    {recipe?.tags.map((tag) => (
                      <Text key={tag.id}>{tag.name}</Text>
                    ))}
                  </Group>
                ) : null}
                <Group>
                  <Text weight="bolder">Allergens:</Text>
                  {recipe?.allergens.map((allergen) => (
                    <Group key={allergen.id}>
                      <Image
                        alt={allergen.id}
                        height={32}
                        src={`${HF_ICON_IMAGE_URL}/${allergen.iconPath}`}
                        width={32}
                      />
                      <Text>{allergen.name}</Text>
                    </Group>
                  ))}
                </Group>
              </Group>
              <Group direction="column">
                <Text>Total Time {recipe?.totalTime}</Text>
                <Text>Difficulty {recipe?.difficulty}</Text>
              </Group>
            </Group>
          </Card.Section>
        </Card>

        <IngredientCard recipe={recipe} />

        <Card mt="xs" shadow="sm" withBorder>
          <Group>
            <Title order={2}>Instructions</Title>
            <List listStyleType="none" size="xl">
              {recipe?.steps?.map((step) => (
                <Fragment key={step.index}>
                  <Group mb={24}>
                    {step.images.map((image) => (
                      <Image
                        alt={image.caption}
                        height={230}
                        key={image.path}
                        placeholder="blur"
                        src={`${HF_STEP_IMAGE_URL}/${image.path}`}
                        width={340}
                      />
                    ))}
                    <List.Item sx={{ maxWidth: 600 }}>
                      {step?.instructions}
                    </List.Item>
                  </Group>
                  <Divider my="sm" />
                </Fragment>
              ))}
            </List>
          </Group>
        </Card>
      </Container>
    </>
  );
};

export default Recipe;
