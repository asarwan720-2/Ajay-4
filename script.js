const supabaseUrl = "https://abc.supabase.co";
const supabaseKey = "xyz";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function login() {
  let mobile = document.getElementById("mobile").value;
  let password = document.getElementById("password").value;

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("mobile", mobile)
    .eq("password", password);

  if (data.length > 0) {
    alert("Login Successful");
  } else {
    alert("Wrong mobile or password");
  }
}
