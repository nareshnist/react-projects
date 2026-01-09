import { useMutation } from "./useMutation";

function PostCreate() {
  const { mutate, isLoading, data, error } = useMutation();

  
  const createPost = () =>{
        mutate({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "POST",
        body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
        }),
        headers: {
        "Content-type": "application/json; charset=UTF-8",
        },
    });

    // 🔹 PUT (Update full object)

    // mutate({
    // url: `/products/${id}`,
    //   method: 'PUT',
    //   body: updatedProduct,
    // });

    // 🔹 PATCH (Partial update)
    //   mutate({
    //     url: `/products/${id}`,
    //     method: 'PATCH',
    //     body: { price: 900 },
    // });

    //🔹 DELETE

// mutate({
//   url: `/products/${id}`,
//   method: 'DELETE',
// });


  }



  return (
    <div>
      <h1>Creating post</h1>
      {
        isLoading && <h6>Loading</h6>
      }

      <button type="button" onClick={createPost}>Create</button>
    </div>
  );
}

export default PostCreate;
