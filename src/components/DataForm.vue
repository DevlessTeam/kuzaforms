<template>
<div>
    <!--<div class="md w-5/6 p-4">-->
    <p class="text-2xl font-sans">Form Name</p>
   <div class="my-2 bg-white p-2 shadow-md rounded">
     <table class="ui celled table" id="datatable">
       <thead>
         <tr>
           <th>Name</th>
           <th>Phone Number</th>
           <th>Email</th>
           <th>Delivery Location</th>
           <th>Delivery Time</th>
           <th>Total Quantity (kg)</th>
           <th>Total Amount (GH&#8373;)</th>
           <th>Form</th>
           <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Demo Vim</td>
            <td>0201234567</td>
            <td>demo@gmail.com</td>
            <td>East Legon</td>
            <td>12:00 pm</td>
            <td>20</td>
            <td>2,000</td>
            <td><span class="ui label orange">orders</span></td>
            <td>
              <router-link :to="{name: 'FormView', params: { id: 1 }}" class="bg-grey p-2 rounded hover:bg-black hover:text-white">
                <i class="fa fa-eye"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
     </table>
   </div>
  </div>
  <!--</div>-->
</template>

<script>
  export default {}
</script>