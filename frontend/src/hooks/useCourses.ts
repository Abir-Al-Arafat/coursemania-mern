// import { useEffect, useState } from "react";
// import { CanceledError } from "../services/api-client";
// import productService from "../services/product-service";

// const useProducts = ({ page, limit }) => {
//   const [products, setProducts] = useState(null);
//   const [error, setError] = useState("");
//   const [filter, setFilter] = useState({
//     searchQuery: "",
//     filter: {
//       param: "price",
//       value: "0",
//       order: "high",
//     },
//     sort: {
//       param: "name",
//       order: "asc",
//     },
//   });
//   const filterParam = filter.filter.param;
//   const filterOrder = filter.filter.order;
//   const filterValue = filter.filter.value;
//   const searchQuery = filter.searchQuery;
//   const sortParam = filter.sort.param;
//   const sortOrder = filter.sort.order;

//   useEffect(() => {
//     const { request, cancel } = productService.getAll(
//       `getall?page=${page}&limit=${limit}${searchQuery ? `&search=${searchQuery}` : ``}${
//         sortParam && sortParam ? `&sortParam=${sortParam}` : ""
//       }${sortOrder && sortOrder ? `&sortOrder=${sortOrder}` : ""}${filterValue ? `&price=${filterValue}` : ""}${
//         filterOrder && filterOrder ? `&priceFil=${filterOrder}` : ""
//       }`
//     );
//     request
//       .then((res) => {
//         setProducts(res.data.data);
//       })
//       .catch((err) => {
//         if (err instanceof CanceledError) return;
//         setError(err.message);
//         console.log(err);
//       });

//     return () => cancel();
//   }, [page, limit, filterParam, filterOrder, filterValue, searchQuery, sortParam, sortOrder]);

//   return { products, error, setProducts, setError, filter, setFilter };
// };

// export default useProducts;

// --------------- prev code --------------------
import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import courseService from "../services/course-service";
import { ICourse } from "../interfaces/ICourse";

const useCourses = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const { request, cancel } = courseService.getAll<ICourse>("/getall");
    request
      .then((res) => {
        console.log("data", res.data);
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        console.log("error", err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { courses, error, isLoading, setCourses, setError };
};

export default useCourses;
