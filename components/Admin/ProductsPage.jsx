import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Loader,
  Dialog,
  Button,
  TextInput,
  JsonInput,
  Textarea,
  Checkbox,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getCookie } from "cookies-next";

import { IconCirclePlus } from "@tabler/icons-react";
import AdminListTable from "./AdminListTable";

import { endPoints, getEndpoint } from "../../lib/pages";
export default function ProductsPage() {
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [opened, { toggle, close }] = useDisclosure(false);

  const [productAdded, setProductAdded] = useState(false);

  const [editItemMenu, setEditItemMenu] = useState(false);

  var product = {
    name: "",
    description: "",
    price: "",
    image: "",
  };

  const [editProduct, setEditProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: "",
  });
  useEffect(() => {
    async function getItems() {
      setIsLoading(true);
      var result = await axios.post(getEndpoint(endPoints.getItemwd), {});
      if (!result.data.success) {
        console.log(result);
      } else {
        setItems(result.data.items);
        console.log(items);
      }
      setIsLoading(false);
    }
    getItems();
  }, [productAdded]);

  const add_item = async (event) => {
    event.preventDefault();
    setEditItemMenu(false);
    if (isLoading) {
      return;
    }

    let token = getCookie("auth");
    setIsLoading(true);

    var result = await axios.post(getEndpoint(endPoints.addItem), {
      token: token,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    });

    if (!result.data.success) {
      console.log(result);
    } else {
      close();
      setProductAdded(!productAdded);
    }
    setIsLoading(false);
  };

  const delete_item = async (id) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    let token = getCookie("auth");
    var result = await axios.post(getEndpoint(endPoints.delItem), {
      token: token,
      id: id,
    });
    if (!result.data.success) {
      console.log(result);
    } else {
      close();
      setProductAdded(!productAdded);
    }
    setIsLoading(false);
  };

  const edit_item = async (id, name, description, price, image) => {
    close();
    setEditProduct({
      id: id,
      name: name,
      description: description,
      price: price,
      image: image,
    });

    setEditItemMenu(true);
  };

  const edit_item_sendrq = async (event) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    let token = getCookie("auth");
    console.log(product);
    var result = await axios.post(getEndpoint(endPoints.editItem), {
      token: token,
      id: editProduct.id,
      name: editProduct.name,
      description: editProduct.description,
      price: editProduct.price,
      image: editProduct.image,
    });
    if (!result.data.success) {
      console.log(result);
    } else {
      setEditItemMenu(false);
      setProductAdded(!productAdded);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col p-4 gap-2">
      <Dialog position={{ bottom: 20, left: 20 }} opened={isLoading}>
        <div className="flex items-center gap-2">
          <Loader size="sm" color="black"></Loader>
          Loading
        </div>
      </Dialog>

      <Dialog
        position={{ bottom: 20, right: 20 }}
        opened={opened}
        withCloseButton
        onClose={close}
      >
        <form className="flex flex-col gap-2" onSubmit={add_item}>
          <h1>Add new item</h1>
          <TextInput
            className=""
            label="Item name"
            onChange={(event) => {
              product.name = event.currentTarget.value;
            }}
          ></TextInput>
          <Textarea
            label="Item description"
            onChange={(event) => {
              product.description = event.currentTarget.value;
            }}
          ></Textarea>
          <TextInput
            className=""
            label="Item Price"
            placeholder="eg: NPR 1200"
            onChange={(event) => {
              product.price = event.currentTarget.value;
            }}
          ></TextInput>
          <TextInput
            className=""
            label="Item Image Url"
            placeholder=""
            onChange={(event) => {
              product.image = event.currentTarget.value;
            }}
          ></TextInput>

          <Button color="black" type="submit">
            {isLoading ? <Loader color="white" size="xs" /> : "Add item"}
          </Button>
        </form>
      </Dialog>

      <Dialog
        position={{ bottom: 20, right: 20 }}
        opened={editItemMenu}
        withCloseButton
        onClose={() => {
          setEditItemMenu(false);
        }}
      >
        <form className="flex flex-col gap-2" onSubmit={edit_item_sendrq}>
          <h1>Edit item</h1>
          <TextInput
            className=""
            label="Item name"
            placeholder={editProduct.name}
            onChange={(event) => {
              setEditProduct({
                id: editProduct.id,
                name: event.currentTarget.value,
                description: editProduct.description,
                price: editProduct.price,
              });
            }}
          ></TextInput>
          <Textarea
            label="Item description"
            placeholder={editProduct.description}
            onChange={(event) => {
              setEditProduct({
                id: editProduct.id,
                name: editProduct.name,
                description: event.currentTarget.value,
                price: editProduct.price,
              });
            }}
          ></Textarea>
          <TextInput
            className=""
            label="Item Price"
            placeholder={editProduct.price}
            onChange={(event) => {
              setEditProduct({
                id: editProduct.id,
                name: editProduct.name,
                description: editProduct.description,
                price: event.currentTarget.value,
              });
            }}
          ></TextInput>
          <TextInput
            className=""
            label="Item Image"
            placeholder={editProduct.price}
            onChange={(event) => {
              setEditProduct({
                id: editProduct.id,
                name: editProduct.name,
                description: editProduct.description,
                price: editProduct.description,
                image: event.currentTarget.value,
              });
            }}
          ></TextInput>

          <Button color="black" type="submit">
            {isLoading ? <Loader color="white" size="xs" /> : "Add item"}
          </Button>
        </form>
      </Dialog>

      {/* Header for the page */}
      <div className="flex justify-between">
        <div className="flex text-2xl items-center gap-2">Listed items</div>
        <Button color="black" leftSection={<IconCirclePlus />} onClick={toggle}>
          Add item
        </Button>
      </div>

      {/* Item listing stuff */}
      <AdminListTable
        items={items}
        headers={["", "Id", "Image", "Name", "Description", "Price"]}
        delete_item={delete_item}
        edit_item={edit_item}
      />
    </div>
  );
}
