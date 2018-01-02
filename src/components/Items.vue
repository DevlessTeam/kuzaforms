<template>
	<div class="md">
		<p class="text-2xl font-sans">Ingredients</p>
		<div class="ui compact menu">
			<a class="item">
				<i class="plus icon"></i>
				New
			</a>
		</div>
		<div class="my-2 bg-white p-2 shadow-md rounded">
     <table class="ui celled table" id="datatable">
       <thead>
         <tr>
           <th>#</th>
           <th>Name</th>
           <th>Description</th>
           <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Demo Vim</td>
            <td>0201234567</td>
            <td>demo@gmail.com</td>
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
</template>