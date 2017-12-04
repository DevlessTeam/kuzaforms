<template>
    <div class="md p-4">
            <p class="text-2xl font-sans tracking-tight">Form Name & No</p>
            <div class="container">
                <div class="ui compact menu">
                    <a class="item">
                        <i class="unhide icon"></i>
                        View
                    </a>
                    <a class="item">
                        <i class="edit icon"></i>
                        Edit
                    </a>
                    <a class="item">
                        <i class="remove icon"></i>
                        Delete
                    </a>
                </div>
                <div class="float-right">
                    <a class="ui teal right ribbon label">Payment completed</a>
                </div>
            </div>

            <div class="my-2 bg-white p-2 shadow-md rounded">
                <!-- <p class="text-xl">Customer Details</p> -->
                <div class="flex flex-wrap -mx-4">
                    <div class="w-full md:w-1/3 px-4 border-r">
                        <div class="p-4">
                            <form class="ui form">
                                <h4 class="ui dividing header">Customer Details</h4>

                                <div class="field">
                                    <label>Name</label>
                                    <div class="field">
                                        <input type="text" name="name" value="John Doe" readonly>
                                    </div>
                                </div>
                                <div class="field">
                                    <label>Phone Number</label>
                                    <div class="field">
                                        <input type="tel" name="name" value="0201234567" readonly>
                                    </div>
                                </div>
                                <div class="field">
                                    <label>Email</label>
                                    <div class="field">
                                        <input type="email" name="name" value="john@example.com" readonly>
                                    </div>
                                </div>
                                <div class="two fields">
                                    <div class="field">
                                        <label>Delivery Locaiton</label>
                                        <input type="text" placeholder="Madina">
                                    </div>
                                    <div class="field">
                                        <label>Delivery Time</label>
                                        <input type="text" placeholder="12:00">
                                    </div>
                                </div>
                                <!-- <div class="ui button" tabindex="0">Submit Order</div> -->
                            </form>
                        </div>
                    </div>
                    <div class="w-full md:w-2/3 px-4">
                        <div class="p-4">
                            <h4 class="ui dividing header">Order Details</h4>
                            <table class="ui celled table">
                                <thead>
                                    <tr>
                                        <th>Cut</th>
                                        <th>Quantity (KG)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Boneless Stewing Beef</td>
                                        <td>10</td>
                                    </tr>
                                    <tr>
                                        <td>Ribs</td>
                                        <td>10</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="text-xl font-semibold font-sans">
                                <p>
                                    <span>Total Quantity (KG): </span>20</p>
                                <p>Total Price (GH&#8373;): 2,000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {}
</script>