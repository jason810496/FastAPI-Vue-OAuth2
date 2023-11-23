import { reactive } from "vue";
import { apiGetUserList, apiRegister } from "../api/user";
import { useLoadingStore } from "./loading";
import { useDialogStore } from "./dialog";
import router from "../router";

// data provider pattern : 
// https://www.patterns.dev/vue/data-provider

function useFetchUser() {
  const userList = reactive([
    {username: "",birthday: "",}
  ]);

  const fetchUsers = async () => {
    const loadingStore = useLoadingStore();
    loadingStore.setLoading();

    try {
      const res = await apiGetUserList();
      userList.value = res.data;
    } catch (err) {
      console.log(err);
    } finally {
      // for loading test
      // setTimeout(() => {
      //   loadingStore.clearLoading();
      // }, 1000);
      loadingStore.clearLoading();
    }
  };

  fetchUsers();

  return { userList };
}

async function registerUser(form){
  const loadingStore = useLoadingStore();
  const dialogStore = useDialogStore();
  loadingStore.setLoading();

  apiRegister(form)
  .then((res) => {
    console.log(res);
    dialogStore.setSuccess({
      title: "Register Success",
      firstLine: "You can login now",
      secondLine: "This dialog will close in 2 seconds",
    });
    setTimeout(() => {
      router.push("/login");
    },2010);
  })
  .catch((err) => {
    console.log(err);
    dialogStore.setError({
      title: "Register Failed",
      firstLine: "Please check your input",
      secondLine: "This dialog will close in 2 seconds",
    });
  })
  .finally(() => {
    loadingStore.clearLoading();
    setTimeout(() => {
      dialogStore.reset();
    }, 2000);
  });
}

async function loginUser(form){
  const loadingStore = useLoadingStore();
  const dialogStore = useDialogStore();
  loadingStore.setLoading();

  apiRegister(form)
  .then((res) => {
    console.log(res);
    dialogStore.setSuccess({
      title: "Login Success",
      firstLine: "You can login now",
      secondLine: "This dialog will close in 2 seconds",
    });
  })
  .catch((err) => {
    console.log(err);
    dialogStore.setError({
      title: "Login Failed",
      firstLine: "Please check your input",
      secondLine: "This dialog will close in 2 seconds",
    });
  })
  .finally(() => {
    loadingStore.clearLoading();
    setTimeout(() => {
      dialogStore.reset();
    }, 2000);
  });
}


export { useFetchUser, registerUser, loginUser };
